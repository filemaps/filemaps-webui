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

export class RemoveResourcesCommand implements Command {

  private drafts: ResourceDraft[];
  private fileMap: FileMap;

  constructor(
    private fileMapService: FileMapService,
    private resources: Resource[]
  ) {}

  exec(): Observable<any> {
    const subject = new Subject<Resource[]>();
    this.fileMapService.removeResources(this.resources, () => {
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
      }

      subject.next(this.resources);
    });

    return subject.asObservable();
  }

  undo(): Observable<any> {
    const subject = new Subject<Resource[]>();

    this.fileMapService.addResources(this.fileMap, this.drafts, resources => {
      // save new resources for undo
      this.resources = resources;
      subject.next(resources);
    });

    return subject.asObservable();
  }
}
