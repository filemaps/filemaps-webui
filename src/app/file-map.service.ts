// Copyright (C) 2017 File Maps Web UI Authors.
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { DataService } from './data.service';
import { FileMap } from './models/file-map';
import { RenderService } from './render.service';

@Injectable()
export class FileMapService {

  current: FileMap;

  // Observable source
  private fileMapChangedSource = new Subject<FileMap>();

  // Observable stream
  fileMapChanged$ = this.fileMapChangedSource.asObservable();

  constructor(
    private dataService: DataService,
    private renderService: RenderService,
  ) { }

  public useFileMap(fileMap: FileMap) {
    this.current = fileMap;
    this.renderService.clear();
    fileMap.draw();

    // use Subject to inform observers about file map change
    this.fileMapChangedSource.next(fileMap);
  }
}
