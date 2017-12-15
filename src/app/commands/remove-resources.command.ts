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

export class RemoveResourcesCommand implements Command {

  private drafts: ResourceDraft[];
  private fileMap: FileMap;

  constructor(
    private dataService: DataService,
    private resources: Resource[]
  ) {}

  exec(): Observable<any> {
    const subject = new Subject<Resource[]>();
    this.dataService.removeResources(this.resources)
      .subscribe(
        () => {
          // create ResourceDrafts for undo
          this.drafts = [];

          for (const resource of this.resources) {
            const draft = {
              path: resource.path,
              pos: {
                x: resource.pos.x,
                y: resource.pos.y,
                z: resource.pos.z
              }
            };
            this.drafts.push(new ResourceDraft(draft));
            this.fileMap = resource.fileMap;
            resource.remove();
          }

          subject.next(this.resources);
        }
      );

    return subject.asObservable();
  }

  undo(): Observable<any> {
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
}
