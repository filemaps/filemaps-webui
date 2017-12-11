// Copyright (c) 2017, CodeBoy. All rights reserved.
//
// This Source Code Form is subject to the terms of the
// license that can be found in the LICENSE file.

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Command } from './command';
import { DataService } from '../data.service';
import { FileMap } from '../models/file-map';
import { Resource } from '../models/resource';
import { ResourceDraft } from '../models/resource-draft';

export class AddResourcesCommand implements Command {

  private resources: Resource[];

  constructor(
    private dataService: DataService,
    private fileMap: FileMap,
    private drafts: ResourceDraft[]
  ) {}

  exec(): Observable<any> {
    const subject = new Subject<Resource[]>();

    this.dataService.addResources(this.fileMap, this.drafts)
      .subscribe(
        resources => {
          // save new resources for undo
          this.resources = resources;

          // add new resources to current file map and draw them
          for (const resource of resources) {
            this.fileMap.resources.push(resource);
            resource.draw();
          }

          subject.next(resources);
        }
      );

    return subject.asObservable();
  }

  undo(): Observable<any> {
    const subject = new Subject<Resource[]>();
    this.dataService.removeResources(this.resources)
      .subscribe(
        () => {
          for (const resource of this.resources) {
            resource.remove();
          }

          subject.next(this.resources);
        }
      );

    return subject.asObservable();
  }
}
