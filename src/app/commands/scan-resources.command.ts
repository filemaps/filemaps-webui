// Copyright (c) 2017, CodeBoy. All rights reserved.
//
// This Source Code Form is subject to the terms of the
// license that can be found in the LICENSE file.

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Command } from './command';
import { FileMap } from '../models/file-map';
import { FileMapService } from '../file-map.service';
import { Resource } from '../models/resource';

export class ScanResourcesCommand implements Command {

  private resources: Resource[];

  constructor(
    private fileMapService: FileMapService,
    private fileMap: FileMap,
    private path: string,
    private excludes: string[]
  ) {}

  exec(): Observable<any> {
    const subject = new Subject<Resource[]>();

    this.fileMapService.scanResources(this.fileMap, this.path, this.excludes, resources => {
      // save new resources for undo
      this.resources = resources;
      subject.next(resources);
    });

    return subject.asObservable();
  }

  undo(): Observable<any> {
    const subject = new Subject<Resource[]>();

    this.fileMapService.removeResources(this.resources, () => {
      for (const resource of this.resources) {
        resource.remove();
      }

      subject.next(this.resources);
    });

    return subject.asObservable();
  }
}
