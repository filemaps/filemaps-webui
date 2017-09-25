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

const API_URL = environment.apiUrl;

@Injectable()
export class DataService {

  constructor(private http: Http) { }

  // API: GET /maps
  public getAllFileMaps(): Observable<FileMap[]> {
    return this.http
      .get(API_URL + '/maps')
      .map(response => {
        const fileMaps = response.json().maps;
        return fileMaps.map((fileMap) => new FileMap(fileMap));
      })
      .catch(this.handleError);
  }

  // API: GET /maps/:id
  public getFileMap(id: number): Observable<FileMap> {
    const url = `${API_URL}/maps/${id}`;
    return this.http
      .get(url)
      .map((res: Response) => new FileMap(res.json()))
      .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    console.error('DataService::handleError', error);
    return Observable.throw(error);
  }

}
