// Copyright (C) 2017 File Maps Web UI Authors.
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { FileMap } from './models/file-map';
import { Info } from './models/info';
import { RenderService } from './render.service';
import { Resource } from './models/resource';
import { ThreeFileMap } from './models/three-file-map';

const API_URL = environment.apiUrl;

@Injectable()
export class DataService {

  constructor(
    private http: Http,
    private renderService: RenderService
  ) { }

  // API: GET /maps
  public getAllFileMaps(): Observable<FileMap[]> {
    return this.http
      .get(API_URL + '/maps')
      .map(response => {
        const fileMaps = response.json().maps;
        return fileMaps.map((fileMap) => new ThreeFileMap(this, this.renderService, fileMap));
      })
      .catch(this.handleError);
  }

  // API: GET /maps/:id
  public getFileMap(id: number): Observable<FileMap> {
    const url = `${API_URL}/maps/${id}`;
    return this.http
      .get(url)
      .map((res: Response) => new ThreeFileMap(this, this.renderService, res.json()))
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
    return null;
  }

  public getInfo(): Observable<Info> {
    return this.http
      .get(`${API_URL}/info`)
      .map((res: Response) => new Info(res.json()))
      .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    console.error('DataService::handleError', error);
    return Observable.throw(error);
  }

}
