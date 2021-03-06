// Copyright (c) 2018, CodeBoy. All rights reserved.
//
// This Source Code Form is subject to the terms of the
// license that can be found in the LICENSE file.

import { Observable } from 'rxjs/Observable';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';
import { Subject } from 'rxjs/Subject';

import { Command } from './command';
import { FileMapService } from '../file-map.service';
import { FileMap } from '../models/file-map';

export class UpdateFileMapCommand implements Command {

  private before: FileMap;
  private after: FileMap;

  constructor(
    private fileMapService: FileMapService,
    fileMap: FileMap,
    private done: (fileMap: FileMap) => void,
  ) {
    this.before = { ...fileMap };
  }

  /**
   * Makes a shallow copy of given file map and saves it for undo/redo.
   */
  saveAfterState(fileMap: FileMap) {
    this.after = { ...fileMap };
  }

  exec(): Observable<any> {
    if (this.after === undefined) {
      console.error('UpdateResourcesCommand::saveAfterState() must be called before exec()');
      return new EmptyObservable();
    }

    const subject = new Subject<FileMap>();
    this.fileMapService.updateMap(this.after, fileMap => {
      subject.next(fileMap);
      this.done(fileMap);
    });

    return subject.asObservable();
  }

  undo(): Observable<any> {
    const subject = new Subject<FileMap>();
    this.fileMapService.updateMap(this.before, fileMap => {
      subject.next(fileMap);
      this.done(fileMap);
    });

    return subject.asObservable();
  }
}
