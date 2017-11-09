// Copyright (c) 2017, CodeBoy. All rights reserved.
//
// This Source Code Form is subject to the terms of the
// license that can be found in the LICENSE file.

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

  public updateFileMap(fileMap: FileMap) {
    this.dataService.updateFileMap(fileMap)
      .subscribe(
        (fm: FileMap) => {
          // make sure we have same title as server
          fileMap.title = fm.title;

          // use Subject to inform observers about file map change
          this.fileMapChangedSource.next(fileMap);
        }
      );
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

  /**
   * Scans directories recursively and adds new resources to current file map.
   */
  public scanResources(path: string, exclude: string[]) {
    this.dataService.scanResources(this.current, path, exclude)
      .subscribe(
        (resources) => {
          for (const resource of resources) {
            this.current.resources.push(resource);
            resource.draw();
          }
        }
      );
  }
}
