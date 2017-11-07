// Copyright (c) 2017, CodeBoy. All rights reserved.
//
// This Source Code Form is subject to the terms of the
// license that can be found in the LICENSE file.

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs/Observable';
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
    private http: Http,
    private renderer: Renderer
  ) {
  }

  // API: GET /maps
  public getAllFileMaps(): Observable<FileMap[]> {
    return this.http
      .get(API_URL + '/maps')
      .map(response => {
        const fileMaps = response.json().maps;
        return fileMaps.map((fileMap) => new ThreeFileMap(this, this.renderer, fileMap));
      })
      .catch(this.handleError);
  }

  // API: GET /maps/:id
  public getFileMap(id: number): Observable<FileMap> {
    const url = `${API_URL}/maps/${id}`;
    return this.http
      .get(url)
      .map((res: Response) => new ThreeFileMap(this, this.renderer, res.json()))
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
      .map((res: Response) => new ThreeFileMap(this, this.renderer, res.json()))
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
      .map((response: Response) => {
        const resources = response.json().resources;
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

  public updateResources(resources: Resource[]) {
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
  }

  public removeResources(resources: Resource[]) {
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
        .map((res: Response) => res.json())
        .catch(this.handleError);
    }
  }

  /**
   * Fetches server info. Call this in AppComponent.ngOnInit(),
   * response is cached.
   */
  public loadInfo(): void {
    // fetch info just once, in the start
    this.getInfo()
      .subscribe(
        (info) => {
          this.info = info;
        }
      );
  }

  private getInfo(): Observable<Info> {
    return this.http
      .get(`${API_URL}/info`)
      .map((res: Response) => new Info(res.json()))
      .catch(this.handleError);
  }

  public readDir(path: string): Observable<DirContents> {
    return this.http
      .post(`${API_URL}/browse`, {
        path: path,
      })
      .map((res: Response) => new DirContents(res.json()))
      .catch(this.handleError);
  }

  public importMap(path: string): Observable<FileMap> {
    return this.http
      .post(`${API_URL}/maps/import`, {
        path: path,
      })
      .map((res: Response) => new ThreeFileMap(this, this.renderer, res.json()))
      .catch(this.handleError);
  }

  public createMap(title: string, base: string, file: string) {
    return this.http
      .post(`${API_URL}/maps`, {
        title: title,
        base: base,
        file: file,
      })
      .map((res: Response) => new ThreeFileMap(this, this.renderer, res.json()))
      .catch(this.handleError);
  }

  public getConfig(): Observable<ConfigResponse> {
    return this.http
      .get(`${API_URL}/config`)
      .map((res: Response) => new ConfigResponse(res.json()))
      .catch(this.handleError);
  }

  public setConfig(config: Config) {
    return this.http
      .put(`${API_URL}/config`, config)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    console.error('DataService::handleError', error);
    return Observable.throw(error);
  }
}
