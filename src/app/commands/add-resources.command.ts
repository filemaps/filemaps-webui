// Copyright (c) 2018, CodeBoy. All rights reserved.
//
// This Source Code Form is subject to the terms of the
// license that can be found in the LICENSE file.

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Command } from './command';
import { FileMap } from '../models/file-map';
import { FileMapService } from '../file-map.service';
import { Resource } from '../models/resource';
import { ResourceDraft } from '../models/resource-draft';

export class AddResourcesCommand implements Command {

  private resources: Resource[];

  constructor(
    private fileMapService: FileMapService,
    private fileMap: FileMap,
    private drafts: ResourceDraft[]
  ) {}

  exec(): Observable<any> {
    const subject = new Subject<Resource[]>();

    this.fileMapService.addResources(this.fileMap, this.drafts, resources => {
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
