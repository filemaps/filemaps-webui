// Copyright (C) 2017 File Maps Web UI Authors.
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import * as THREE from 'three';

import { FileMap } from './file-map';
import { Position } from './position';
import { DataService } from '../data.service';
import { Renderer } from '../renderer.service';
import { Resource } from './resource';

export class ThreeResource implements Resource {
  id: number;
  type: number;
  path: string;
  pos: Position;
  readonly fileMap: FileMap;
  readonly dragThreshold = 10;
  readonly selectDuration = 500;
  private obj: THREE.Mesh;
  private dragStart: { x: number, y: number, z: number, time: number };

  constructor(
    private dataService: DataService,
    private renderer: Renderer,
    fileMap: FileMap,
    values: Object = {}
  ) {
    this.fileMap = fileMap;
    Object.assign(this, values);
  }

  /**
   * Draws resource.
   */
  draw(): void {
    const geometry = new THREE.BoxGeometry(50, 56.57, 6);
    this.obj = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({
      color: Math.random() * 0xffffff
    }));

    this.obj.userData = {
      label: null,
      resource: this,
    };

    this.obj.position.x = this.pos.x;
    this.obj.position.y = this.pos.y;
    this.obj.position.z = this.pos.z;

    this.renderer.addResource(this.obj);
  }

  onDragStart(): void {
    this.dragStart = {
      x: this.obj.position.x,
      y: this.obj.position.y,
      z: this.obj.position.z,
      time: new Date().getTime()
    };
  }

  onDragEnd(): void {
    if (Math.abs(this.obj.position.x - this.dragStart.x) < this.dragThreshold &&
      Math.abs(this.obj.position.y - this.dragStart.y) < this.dragThreshold &&
      Math.abs(this.obj.position.z - this.dragStart.z) < this.dragThreshold) {

      // check drag duration
      const duration = new Date().getTime() - this.dragStart.time;
      if (duration < this.selectDuration) {
        this.open();
      } else {
        this.select();
      }

      // restore position
      this.obj.position.x = this.dragStart.x;
      this.obj.position.y = this.dragStart.y;
      this.obj.position.z = this.dragStart.z;
      this.renderer.animate();
    } else {
      // dragged enough to not to be opened
      this.pos.x = this.obj.position.x;
      this.pos.y = this.obj.position.y;
      this.pos.z = this.obj.position.z;

      this.updateServer();
    }
  }

  open(): void {
    this.dataService.openResource(this)
      .subscribe(
        (response: any) => {
          console.log('Open, response:', response);
        }
      );
  }

  /**
   * Updates resource data to server.
   */
  updateServer(): void {
    this.dataService.updateResources([this])
    .subscribe(
      (response: any) => {
        console.log('Update, response:', response);
      }
    );
  }

  close(): void {
    console.log('ThreeResource.close()', this);
  }

  select(): void {
    console.log('ThreeResource.select()', this);
  }
}
