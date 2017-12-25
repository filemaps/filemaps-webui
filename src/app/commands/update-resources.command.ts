// Copyright (c) 2017, CodeBoy. All rights reserved.
//
// This Source Code Form is subject to the terms of the
// license that can be found in the LICENSE file.

import { Observable } from 'rxjs/Observable';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';
import { Subject } from 'rxjs/Subject';

import { Command } from './command';
import { FileMap } from '../models/file-map';
import { FileMapService } from '../file-map.service';
import { Resource } from '../models/resource';
import { ResourceDraft } from '../models/resource-draft';

export class UpdateResourcesCommand implements Command {

  private before: Resource[];
  private after: Resource[];

  constructor(
    private fileMapService: FileMapService,
    private resources: Resource[]
  ) {
    this.before = [];
    for (const resource of resources) {
      // save before states for undo
      this.before.push(resource.copy());
    }
  }

  saveAfterState(updatedResources: Resource[]) {
    this.after = [];
    for (const resource of updatedResources) {
      this.after.push(resource.copy());
    }
  }

  exec(): Observable<any> {
    if (this.after === undefined) {
      console.error('UpdateResourcesCommand::saveAfterState() must be called before exec()');
      return new EmptyObservable();
    }

    const subject = new Subject<Resource[]>();
    this.fileMapService.updateResources(this.after, response => {
      console.log('Update, response:', response);
      subject.next(response);

      this.updateCurrentResources(this.after);
    });

    return subject.asObservable();
  }

  undo(): Observable<any> {
    const subject = new Subject<Resource[]>();
    this.fileMapService.updateResources(this.before, response => {
      subject.next(response);

      this.updateCurrentResources(this.before);
    });

    return subject.asObservable();
  }

  /**
   * Updates current resources to match given resource properties.
   * Resources in this.before and this.after arrays are copies,
   * so we have to update original objects.
   */
  private updateCurrentResources(resources: Resource[]) {
    for (const copy of resources) {
      const current = copy.fileMap.getResource(copy.id);
      if (current) {
        current.copyFrom(copy);
        current.refresh();
      } else {
        console.log('UpdateResourcesCommand::updateResourcesData: resource id not found', copy.id);
      }
    }
  }
}
