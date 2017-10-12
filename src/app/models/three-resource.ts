// Copyright (C) 2017 File Maps Web UI Authors.
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import * as THREE from 'three';

import { FileMap } from './file-map';
import { Position } from './position';
import { RenderService } from '../render.service';
import { Resource } from './resource';

export class ThreeResource implements Resource {
  id: number;
  type: number;
  path: string;
  pos: Position;
  readonly fileMap: FileMap;

  constructor(
    private renderService: RenderService,
    fileMap: FileMap,
    values: Object = {}
  ) {
    this.fileMap = fileMap;
    Object.assign(this, values);
  }

  draw(): void {
    const geometry = new THREE.BoxGeometry(50, 56.57, 6);
    let obj = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({
      color: Math.random() * 0xffffff
    }));

    obj.userData = {
      label: null,
      resource: this,
    };

    obj.position.x = this.pos.x;
    obj.position.y = this.pos.y;
    obj.position.z = this.pos.z;

    obj.rotation.x = 0;
    obj.rotation.y = 0;
    obj.rotation.z = 0;

    obj.scale.x = 1;
    obj.scale.y = 1;
    obj.scale.z = 1;

    obj.castShadow = true;
    obj.receiveShadow = true;

    this.renderService.addResource(obj);
  }
}
