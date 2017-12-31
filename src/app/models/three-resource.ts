// Copyright (c) 2018, CodeBoy. All rights reserved.
//
// This Source Code Form is subject to the terms of the
// license that can be found in the LICENSE file.

import * as THREE from 'three';
import { MeshText2D, textAlign } from 'three-text2d';

import { CommandService } from '../commands/command.service';
import { FileMap } from './file-map';
import { FileMapService } from '../file-map.service';
import { Position } from './position';
import { DataService } from '../data.service';
import { Renderer } from '../renderer.service';
import { Resource } from './resource';
import { Style } from './style';
import { StyleService } from '../style.service';
import { UpdateResourcesCommand } from '../commands/update-resources.command';

export class ThreeResource implements Resource {
  id: number;
  type: number;
  path: string;
  pos: Position;
  style: Style;
  readonly fileMap: FileMap;
  readonly dragThreshold = 10;
  readonly selectDuration = 500;
  private obj: THREE.Mesh;
  private label: MeshText2D;
  private dragStart: { x: number, y: number, z: number, time: number };
  private followers: Resource[];

  constructor(
    private commandService: CommandService,
    private dataService: DataService,
    private fileMapService: FileMapService,
    private renderer: Renderer,
    private styleService: StyleService,
    fileMap: FileMap,
    values: Object = {}
  ) {
    this.fileMap = fileMap;
    Object.assign(this, values);
  }

  /**
   * Returns a shallow copy of Resource.
   */
  copy(): Resource {
    const c = new ThreeResource(
      this.commandService,
      this.dataService,
      this.fileMapService,
      this.renderer,
      this.styleService,
      this.fileMap,
      this
    );
    c.pos = new Position();
    return c.copyFrom(this);
  }

  copyFrom(resource: Resource): Resource {
    this.id = resource.id;
    this.type = resource.type;
    this.path = resource.path;
    this.pos.x = resource.pos.x;
    this.pos.y = resource.pos.y;
    this.pos.z = resource.pos.z;
    return this;
  }

  private getStyleRule(rule: string, defaultVal?: string): string {
    // use resource styles
    if (this.style.rules && this.style.rules.hasOwnProperty(rule)) {
      return this.style.rules[rule];
    }

    // use filemap styles
    return this.fileMap.getStyleRule(this.style.sClass, rule, defaultVal);
  }

  /**
   * Returns color of resource object as number.
   */
  private getColor(): number {
    const defaultColor = 0xffffff;

    let colorStr = this.getStyleRule('color', '#ffffff');

    // handle color codes #01abcd
    if (colorStr[0] === '#') {
      colorStr = '0x' + colorStr.substring(1);
      const color = parseInt(colorStr, 16);
      return (isNaN(color)) ? defaultColor : color;
    }

    return defaultColor;
  }

  /**
   * Draws resource.
   */
  draw(): void {
    const geometry = new THREE.BoxGeometry(50, 56.57, 6);
    this.obj = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({
      color: this.getColor()
    }));

    this.obj.userData = {
      label: null,
      resource: this,
    };

    // label
    this.label = new MeshText2D(this.path, {
      align: textAlign.center,
      font: '20px Oxygen',
      fillStyle: '#000000',
    });
    this.renderer.addResource(this.obj, this.label);

    this.refresh();
  }

  refresh(): void {
    this.obj.position.x = this.pos.x;
    this.obj.position.y = this.pos.y;
    this.obj.position.z = this.pos.z;

    this.updateLabelPos();
  }

  onDragStart(): void {
    this.dragStart = {
      x: this.obj.position.x,
      y: this.obj.position.y,
      z: this.obj.position.z,
      time: new Date().getTime()
    };

    this.followers = this.getFollowers();
    for (let i = 0; i < this.followers.length; i++) {
      this.followers[i].onFollowStart();
    }
  }

  onDrag(): void {
    this.updateLabelPos();

    // move followers
    let offset = {
      x: this.obj.position.x - this.dragStart.x,
      y: this.obj.position.y - this.dragStart.y,
      z: this.obj.position.z - this.dragStart.z,
    };

    for (let i = 0; i < this.followers.length; i++) {
      this.followers[i].onFollow(offset);
    }
  }

  onFollowStart(): void {
    this.dragStart = {
      x: this.obj.position.x,
      y: this.obj.position.y,
      z: this.obj.position.z,
      time: new Date().getTime()
    };
  }

  onFollow(offset: Position): void {
    this.obj.position.x = this.dragStart.x + offset.x;
    this.obj.position.y = this.dragStart.y + offset.y;
    this.obj.position.z = this.dragStart.z + offset.z;
    this.updateLabelPos();
  }

  onDragEnd(): void {
    const resources = [...this.followers, this];

    if (this.movedEnough()) {
      // check drag duration
      const duration = new Date().getTime() - this.dragStart.time;
      if (duration < this.selectDuration) {
        this.open();
      } else {
        this.select();
      }

      // restore position
      for (let i = 0; i < resources.length; i++) {
        resources[i].restoreDrag();
      }
      this.renderer.animate();
    } else {
      // dragged enough to not to be opened
      const cmd = new UpdateResourcesCommand(this.fileMapService, resources);

      // update pos field
      for (let i = 0; i < resources.length; i++) {
        resources[i].syncPos();
      }

      cmd.saveAfterState(resources);

      this.commandService.exec(cmd);
    }
  }

  restoreDrag(): void {
    this.obj.position.x = this.dragStart.x;
    this.obj.position.y = this.dragStart.y;
    this.obj.position.z = this.dragStart.z;
    this.updateLabelPos();
  }

  syncPos(): void {
    this.pos.x = this.obj.position.x;
    this.pos.y = this.obj.position.y;
    this.pos.z = this.obj.position.z;
  }

  open(): void {
    this.dataService.openResource(this)
      .subscribe(
        (response: any) => {
          console.log('Open, response:', response);
        }
      );
  }

  close(): void {
    console.log('ThreeResource.close()', this);
  }

  select(): void {
    this.label.fillStyle = '#ff0000';
  }

  unselect(): void {
    this.label.fillStyle = '#000000';
  }

  remove(): void {
    this.renderer.removeResource(this.obj, this.label);

    // remove from parent
    for (let i = 0; i < this.fileMap.resources.length; i++) {
      if (this.fileMap.resources[i] === this) {
        this.fileMap.resources.splice(i, 1);
      }
    }
  }

  private movedEnough(): boolean {
    return Math.abs(this.obj.position.x - this.dragStart.x) < this.dragThreshold &&
      Math.abs(this.obj.position.y - this.dragStart.y) < this.dragThreshold &&
      Math.abs(this.obj.position.z - this.dragStart.z) < this.dragThreshold;
  }

  private updateLabelPos() {
    this.label.position.x = this.obj.position.x;
    this.label.position.y = this.obj.position.y - 35;
    this.label.position.z = 1;
  }

  private getFollowers(): Resource[] {
    let followers = [];
    for (const selected of this.renderer.getSelectedResources()) {
      if (selected !== this) {
        followers.push(selected);
      }
    }
    return followers;
  }
}
