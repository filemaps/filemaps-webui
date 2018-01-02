// Copyright (c) 2018, CodeBoy. All rights reserved.
//
// This Source Code Form is subject to the terms of the
// license that can be found in the LICENSE file.

import { CommandService } from '../commands/command.service';
import { FileMap } from './file-map';
import { DataService } from '../data.service';
import { FileMapService } from '../file-map.service';
import { Renderer } from '../renderer.service';
import { Resource } from './resource';
import { Style } from './style';
import { StyleService } from '../style.service';
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
  styles: Style[];
  resources: Resource[];

  constructor(
    private commandService: CommandService,
    private dataService: DataService,
    private fileMapService: FileMapService,
    private renderer: Renderer,
    private styleService: StyleService,
    values: Object = {}
  ) {
    Object.assign(this, values);
    const resources: Resource[] = [];
    if (this.resources) {
      this.resources.forEach(resource => {
        resources.push(new ThreeResource(
          this.commandService,
          this.dataService,
          this.fileMapService,
          this.renderer,
          this.styleService,
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

  erase(): void {
    this.resources.forEach(res => res.erase());
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

  getStyleRule(sClass: string, rule: string, defaultVal?: string): string {
    console.log('ThreeFileMap.getStyleRule', sClass, rule, defaultVal, this.styles);
    for (const style of this.styles) {
      if (style.sClass === sClass) {
        if (style.rules.hasOwnProperty(rule)) {
          return style.rules[rule];
        } else {
          return this.styleService.getRule(sClass, rule, defaultVal);
        }
      }
    }
    return defaultVal;
  }
}
