// Copyright (c) 2017, CodeBoy. All rights reserved.
//
// This Source Code Form is subject to the terms of the
// license that can be found in the LICENSE file.

import { FileMap } from './file-map';
import { Resource } from './resource';
import { DataService } from '../data.service';
import { Renderer } from '../renderer.service';
import { ThreeResource } from './three-resource';

export class ThreeFileMap implements FileMap {
  id: number;
  title = '';
  base = '';
  file = '';
  opened: Date;
  version: number;
  title2 = '';
  resources: Resource[];

  constructor(
    private dataService: DataService,
    private renderer: Renderer,
    values: Object = {}
  ) {
    Object.assign(this, values);
    const resources: Resource[] = [];
    if (this.resources) {
      this.resources.forEach(resource => {
        resources.push(new ThreeResource(this.dataService, this.renderer, this, resource));
      });
    }
    this.resources = resources;
  }

  draw(): void {
    this.resources.forEach(res => res.draw());
  }
}
