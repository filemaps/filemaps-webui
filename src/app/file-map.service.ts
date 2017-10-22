// Copyright (C) 2017 File Maps Web UI Authors.
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { DataService } from './data.service';
import { FileMap } from './models/file-map';
import { Renderer } from './renderer.service';
import { Resource } from './models/resource';
import { ResourceDraft } from './models/resource-draft';

@Injectable()
export class FileMapService {

  current: FileMap;

  private selectedResources: Resource[] = [];
  // Observable source
  private fileMapChangedSource = new Subject<FileMap>();

  // Observable stream
  fileMapChanged$ = this.fileMapChangedSource.asObservable();

  constructor(
    private dataService: DataService,
    private renderer: Renderer,
  ) {
    // subscribe to selection change event
    renderer.selectedResourcesChanged$.subscribe(
      (resources: Resource[]) => {
        this.selectedResources = resources;
      }
    );
  }

  public useFileMap(fileMap: FileMap) {
    this.current = fileMap;
    this.renderer.clear();
    fileMap.draw();

    // use Subject to inform observers about file map change
    this.fileMapChangedSource.next(fileMap);
  }

  /**
   * Adds new resources to current file map.
   */
  public addResources(drafts: ResourceDraft[]) {
    this.dataService.addResources(this.current, drafts)
      .subscribe(
        (resources) => {
          // add new resources to current file map and draw them
          for (const resource of resources) {
            this.current.resources.push(resource);
            resource.draw();
          }
        }
      );
  }

  public removeResources(resources: Resource[]) {
    this.dataService.removeResources(resources)
      .subscribe(
        (res) => {
          for (const resource of resources) {
            resource.remove();
          }
        }
      );
  }
}
