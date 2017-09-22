import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { FileMap } from './file-map';

const API_URL = environment.apiUrl;

@Injectable()
export class DataService {

  constructor(private http: Http) { }

  // API: GET /maps
  public getAllFileMaps(): Observable<FileMap[]> {
    return this.http
      .get(API_URL + '/maps')
      .map(response => {
        const fileMaps = response.json();
        return fileMaps.map((fileMap) => new FileMap(fileMap));
      })
      .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    console.error('DataService::handleError', error);
    return Observable.throw(error);
  }

}
