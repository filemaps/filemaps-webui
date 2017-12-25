// Copyright (c) 2017, CodeBoy. All rights reserved.
//
// This Source Code Form is subject to the terms of the
// license that can be found in the LICENSE file.

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { CommandService } from './commands/command.service';
import { DataService } from './data.service';
import { FileMap } from './models/file-map';
import { FileMapResponse } from './models/file-map-response';
import { Renderer } from './renderer.service';
import { Resource } from './models/resource';
import { ResourceDraft } from './models/resource-draft';
import { StyleService } from './style.service';
import { ThreeFileMap } from './models/three-file-map';
import { ThreeResource } from './models/three-resource';

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
    private styleService: StyleService,
  ) {
    // subscribe to selection change event
    renderer.selectedResourcesChanged$.subscribe(
      (resources: Resource[]) => {
        this.selectedResources = resources;
      }
    );
  }

  public getMaps(done: (fileMaps: FileMap[]) => void): void {
    this.dataService.getAllFileMaps()
      .subscribe(
        response => {
          const fileMaps = response.maps.map(fileMap => new ThreeFileMap(
            this.commandService,
            this.dataService,
            this,
            this.renderer,
            this.styleService,
            fileMap
          ));
          // callback
          done(fileMaps);
        }
      );
  }

  public createMap(
    title: string,
    base: string,
    file: string,
    done: (fileMap: FileMap) => void
  ): void {
    this.dataService.createMap(title, base, file)
      .subscribe(
        response => {
          this.styleService.setDefaultStyles(response.defaultStyles);

          const fileMap = new ThreeFileMap(
            this.commandService,
            this.dataService,
            this,
            this.renderer,
            this.styleService,
            response.fileMap,
          );

          this.changeFileMap(fileMap);

          // callback
          done(fileMap);
        }
      );
  }

  public loadMap(id: number, done: (fileMap: FileMap) => void): void {
    this.dataService.getFileMap(id)
      .subscribe(
        response => {
          this.styleService.setDefaultStyles(response.defaultStyles);

          const fileMap = new ThreeFileMap(
            this.commandService,
            this.dataService,
            this,
            this.renderer,
            this.styleService,
            response.fileMap,
          );

          this.changeFileMap(fileMap);

          // callback
          done(fileMap);
        }

      );
  }

  public importMap(path: string, done: (fileMap: FileMap) => void): void {
    this.dataService.importMap(path)
      .subscribe(
        response => {
          this.styleService.setDefaultStyles(response.defaultStyles);

          const fileMap = new ThreeFileMap(
            this.commandService,
            this.dataService,
            this,
            this.renderer,
            this.styleService,
            response.fileMap,
          );

          this.changeFileMap(fileMap);

          // callback
          done(fileMap);
        }
      );
  }

  public updateMap(fileMap: FileMap, done: (serverFileMap: FileMap) => void): void {
    this.dataService.updateFileMap(fileMap)
      .subscribe(
        response => {
          this.styleService.setDefaultStyles(response.defaultStyles);

          const serverFileMap = new ThreeFileMap(
            this.commandService,
            this.dataService,
            this,
            this.renderer,
            this.styleService,
            response.fileMap,
          );

          // make sure to update local file map
          this.current.title = serverFileMap.title;
          this.current.description = serverFileMap.description;
          this.current.exclude = serverFileMap.exclude;

          // use Subject to inform observers about file map change
          this.fileMapChangedSource.next(this.current);

          // callback
          done(serverFileMap);
        }
      );
  }

  public addResources(
    fileMap: FileMap,
    drafts: ResourceDraft[],
    done: (resources: Resource[]) => void
  ): void {
    this.dataService.addResources(fileMap, drafts)
      .subscribe(
        response => {
          const resources = response.resources.map(rsrc => new ThreeResource(
            this.commandService,
            this.dataService,
            this,
            this.renderer,
            this.styleService,
            fileMap,
            rsrc
          ));

          // add new resources to file map and draw them
          for (const resource of resources) {
            fileMap.resources.push(resource);
            resource.draw();
          }

          // callback
          done(resources);
        }
      );
  }

  public updateResources(resources: Resource[], done: (response: any) => void): void {
    this.dataService.updateResources(resources)
      .subscribe(
        response => {
          done(response);
        }
      );
  }

  public scanResources(
    fileMap: FileMap,
    path: string,
    exclude: string[],
    done: (resources: Resource[]) => void
  ): void {
    this.dataService.scanResources(fileMap, path, exclude)
      .subscribe(
        response => {
          const resources = response.resources.map(rsrc => new ThreeResource(
            this.commandService,
            this.dataService,
            this,
            this.renderer,
            this.styleService,
            fileMap,
            rsrc
          ));

          // add new resources to file map and draw them
          for (const resource of resources) {
            fileMap.resources.push(resource);
            resource.draw();
          }

          // callback
          done(resources);
        }
      );
  }

  public removeResources(resources: Resource[], done: () => void): void {
    this.dataService.removeResources(resources)
      .subscribe(
        response => {
          for (const resource of resources) {
            resource.remove();
          }

          // callback
          done();
        }
      );
  }

  private changeFileMap(fileMap: FileMap) {
    this.renderer.clear();

    this.current = fileMap;
    fileMap.draw();

    // use Subject to inform observers about file map change
    this.fileMapChangedSource.next(fileMap);

    // clear undo history
    this.commandService.clear();
  }
}
