// Copyright (c) 2017, CodeBoy. All rights reserved.
//
// This Source Code Form is subject to the terms of the
// license that can be found in the LICENSE file.

import { CommandService } from '../commands/command.service';
import { FileMap } from './file-map';
import { Resource } from './resource';
import { DataService } from '../data.service';
import { Renderer } from '../renderer.service';
import { ThreeResource } from './three-resource';

export class ThreeFileMap implements FileMap {
  id: number;
  title = '';
  description = '';
  base = '';
  file = '';
  opened: Date;
  version: number;
  title2 = '';
  exclude: string[];
  resources: Resource[];

  constructor(
    private commandService: CommandService,
    private dataService: DataService,
    private renderer: Renderer,
    values: Object = {}
  ) {
    Object.assign(this, values);
    const resources: Resource[] = [];
    if (this.resources) {
      this.resources.forEach(resource => {
        resources.push(new ThreeResource(
          this.commandService,
          this.dataService,
          this.renderer,
          this,
          resource
        ));
      });
    }
    this.resources = resources;
  }

  draw(): void {
    this.resources.forEach(res => res.draw());
  }

  /**
   * Returns Resource by ID, or null if not found.
   */
  getResource(id: number): Resource {
    for (let i = 0; i < this.resources.length; i++) {
      if (this.resources[i].id === id) {
        return this.resources[i];
      }
    }
    // not found
    return null;
  }
}
