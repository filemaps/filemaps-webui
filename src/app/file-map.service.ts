// Copyright (c) 2017, CodeBoy. All rights reserved.
//
// This Source Code Form is subject to the terms of the
// license that can be found in the LICENSE file.

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { AddResourcesCommand } from './commands/add-resources.command';
import { CommandService } from './commands/command.service';
import { DataService } from './data.service';
import { FileMap } from './models/file-map';
import { Renderer } from './renderer.service';
import { RemoveResourcesCommand } from './commands/remove-resources.command';
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
    private commandService: CommandService,
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
    const cmd = new AddResourcesCommand(this.dataService, this.current, drafts);
    this.commandService.exec(cmd);
  }

  public removeResources(resources: Resource[]) {
    const cmd = new RemoveResourcesCommand(this.dataService, resources);
    this.commandService.exec(cmd);
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
