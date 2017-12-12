// Copyright (c) 2017, CodeBoy. All rights reserved.
//
// This Source Code Form is subject to the terms of the
// license that can be found in the LICENSE file.

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs/Observable';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { FileMap } from './models/file-map';
import { Config } from './models/config';
import { ConfigResponse } from './models/config-response';
import { DirContents } from './models/dir-contents';
import { Info } from './models/info';
import { Renderer } from './renderer.service';
import { Resource } from './models/resource';
import { ResourceDraft } from './models/resource-draft';
import { ThreeFileMap } from './models/three-file-map';
import { ThreeResource } from './models/three-resource';

const API_URL = environment.apiUrl;

@Injectable()
export class DataService {

  // loadInfo() fetches Info, called in AppComponent.ngOnInit
  public info: Info = new Info();

  constructor(
    private http: HttpClient,
    private renderer: Renderer
  ) {
  }

  // API: GET /maps
  public getAllFileMaps(): Observable<FileMap[]> {
    return this.http
      .get(API_URL + '/maps')
      .map(data => {
        const fileMaps = data['maps'];
        return fileMaps.map((fileMap) => new ThreeFileMap(this, this.renderer, fileMap));
      })
      .catch(this.handleError);
  }

  // API: GET /maps/:id
  public getFileMap(id: number): Observable<FileMap> {
    const url = `${API_URL}/maps/${id}`;
    return this.http
      .get(url)
      .map(data => new ThreeFileMap(this, this.renderer, data))
      .catch(this.handleError);
  }

  /**
   * Sends modified FileMap properties to server.
   * API: PUT /maps/:mapid
   */
  public updateFileMap(fileMap: FileMap): Observable<FileMap> {
    const url = `${API_URL}/maps/${fileMap.id}`;
    return this.http
      .put(url, {
        title: fileMap.title,
        description: fileMap.description,
        base: fileMap.base,
        file: fileMap.file,
        exclude: fileMap.exclude,
      })
      .map(data => new ThreeFileMap(this, this.renderer, data))
      .catch(this.handleError);
  }


  /**
   * Adds new resources.
   * API: POST /maps/:mapid/resources
   */
  public addResources(fileMap: FileMap, drafts: ResourceDraft[]): Observable<Resource[]> {
    return this.http
      .post(`${API_URL}/maps/${fileMap.id}/resources`, {
        items: drafts,
      })
      .map(data => {
        const resources = data['resources'];
        return resources.map((rsrc) => new ThreeResource(this, this.renderer, fileMap, rsrc));
      })
      .catch(this.handleError);
  }

  /**
   * Opens a resource.
   * API: GET /maps/:mapid/resources/:resourceid/open
   */
  public openResource(res: Resource) {
    const url = `${API_URL}/maps/${res.fileMap.id}/resources/${res.id}/open`;
    return this.http
      .get(url)
      .catch(this.handleError);
  }

  public updateResources(resources: Resource[]): Observable<any> {
    if (resources.length > 0) {
      const fileMap = resources[0].fileMap;
      const url = `${API_URL}/maps/${fileMap.id}/resources`;
      return this.http
        .put(url, {
          // map resources to simpler objects for server
          resources: resources.map(function(res) {
            return {
              id: res.id,
              pos: res.pos,
            };
          })
        })
        .catch(this.handleError);
    }
    // return empty observable
    console.debug('No resources to update');
    return new EmptyObservable();
  }

  /**
   * Scans directories and adds new Resources.
   * API: POST /maps/:mapid/resources/scan
   */
  public scanResources(fileMap: FileMap, path: string, exclude: string[]): Observable<Resource[]> {
    const url = `${API_URL}/maps/${fileMap.id}/resources/scan`;
    return this.http
      .post<Resource[]>(url, {
        path: path,
        exclude: exclude,
      })
      .map(data => {
        const resources = data['resources'];
        return resources.map((rsrc) => new ThreeResource(this, this.renderer, fileMap, rsrc));
      })
      .catch(this.handleError);
  }

  public removeResources(resources: Resource[]): Observable<any> {
    if (resources.length > 0) {
      const fileMap = resources[0].fileMap;
      const url = `${API_URL}/maps/${fileMap.id}/resources/delete`;

      const ids: number[] = [];
      for (const rsrc of resources) {
        ids.push(rsrc.id);
      }

      return this.http
        .post(url, {
          ids: ids,
        })
        .catch(this.handleError);
    }
    // return empty observable
    console.debug('No resources to remove');
    return new EmptyObservable();
  }

  /**
   * Fetches server info. Call this in AppComponent.ngOnInit(),
   * response is cached.
   */
  public loadInfo(): void {
    // fetch info just once, in the start
    this.getInfo()
      .subscribe(
        info => {
          this.info = info;
        }
      );
  }

  private getInfo(): Observable<Info> {
    return this.http
      .get<Info>(`${API_URL}/info`);
  }

  public readDir(path: string): Observable<DirContents> {
    return this.http
      .post(`${API_URL}/browse`, {
        path: path,
      })
      .map(data => new DirContents(data))
      .catch(this.handleError);
  }

  public importMap(path: string): Observable<FileMap> {
    return this.http
      .post(`${API_URL}/maps/import`, {
        path: path,
      })
      .map(data => new ThreeFileMap(this, this.renderer, data))
      .catch(this.handleError);
  }

  public createMap(title: string, base: string, file: string) {
    return this.http
      .post(`${API_URL}/maps`, {
        title: title,
        base: base,
        file: file,
      })
      .map(data => new ThreeFileMap(this, this.renderer, data))
      .catch(this.handleError);
  }

  public getConfig(): Observable<ConfigResponse> {
    return this.http
      .get(`${API_URL}/config`)
      .map(data => new ConfigResponse(data))
      .catch(this.handleError);
  }

  public setConfig(config: Config) {
    return this.http
      .put(`${API_URL}/config`, config)
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('DataService::handleError', error);
    return Observable.throw(error);
  }
}
