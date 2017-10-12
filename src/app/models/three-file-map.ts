// Copyright (C) 2017 File Maps Web UI Authors.
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { FileMap } from './file-map';
import { Resource } from './resource';
import { RenderService } from '../render.service';
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
    private renderService: RenderService,
    values: Object = {}
  ) {
    Object.assign(this, values);
    const resources: Resource[] = [];
    if (this.resources) {
      console.log('this resources', this.resources);
      this.resources.forEach(resource => {
        console.log('append', resource);
        resources.push(new ThreeResource(this.renderService, this, resource));
      });
    }
    this.resources = resources;
    console.log('OK', this.resources);
  }

  draw(): void {
    this.resources.forEach(res => res.draw());
  }
}
