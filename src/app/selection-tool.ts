// Copyright (c) 2018, CodeBoy. All rights reserved.
//
// This Source Code Form is subject to the terms of the
// license that can be found in the LICENSE file.

import {
  BufferAttribute,
  BufferGeometry,
  Camera,
  EventDispatcher,
  Line,
  LineBasicMaterial,
  Object3D,
  Raycaster,
  Scene,
  Vector2,
  Vector3
} from 'three';

const startSelectButton = 2;

export class SelectionTool extends EventDispatcher {
  private coords: any;
  private firstCorner: Vector2;
  private line: Line;
  private mouse = new Vector2();
  private mouseGround = new Vector3();
  private raycaster = new Raycaster();
  private selected = new Set<Object3D>();
  private selecting = false;

  constructor(
    private scene: Scene,
    private ground: Object3D,
    private objects: Object3D[],
    private cam: Camera,
    private domElement?: HTMLElement
  ) {
    super();
    this.activate();
  }

  activate() {
    const geometry = new BufferGeometry();
    geometry.setDrawRange(0, 5);

    this.coords = new Float32Array(5 * 3);
    geometry.addAttribute('position', new BufferAttribute(this.coords, 3));

    const material = new LineBasicMaterial({
      color: 0xd32f2f,
      linewidth: 2,
    });

    this.line = new Line(geometry, material);
    this.line.visible = false; // begin with hidden line

    this.scene.add(this.line);

    // start selection from mouse button
    document.addEventListener('mousedown', this.mouseDown, false);
    this.domElement.addEventListener('contextmenu', this.contextmenu, false);
  }

  start() {
    this.selecting = true;
    document.addEventListener('touchstart', this.touchStart, false);
    // touchmove must be attached to domElement or else document is scrolled with touch
    this.domElement.addEventListener('touchmove', this.touchMove, false);
    document.addEventListener('touchend', this.touchEnd, false);

    this.domElement.style.cursor = 'crosshair';
    this.dispatchEvent({ type: 'start' });
  }

  /**
   * Clears selection.
   */
  public clear() {
    this.selected.clear();
    this.dispatchEvent({
      type: 'selected',
      selected: this.selected,
      added: [],
      removed: [],
    });
  }

  private end() {
    this.line.visible = false;
    document.removeEventListener('mousemove', this.mouseMove, false);
    document.removeEventListener('mouseup', this.mouseUp, false);
    this.domElement.removeEventListener('touchmove', this.touchMove, false);
    document.removeEventListener('touchstart', this.touchStart, false);
    document.removeEventListener('touchend', this.touchEnd, false);
    this.domElement.style.cursor = 'auto';
    this.dispatchEvent({ type: 'end' });
    this.selecting = false;
  }

  private mouseMove = (event: any) => {
    event.preventDefault();

    this.updateMouseGround(event.clientX, event.clientY);
    this.dispatchEvent({ type: 'change' });
    this.checkSelectedObjects();
  }

  private mouseDown = (event: any) => {
    event.preventDefault();
      event.stopPropagation();

    if (event.button === startSelectButton) {
      this.start();
    }

    if (this.selecting) {
      this.updateMouseGround(event.clientX, event.clientY);
      this.initLine();

      document.addEventListener('mousemove', this.mouseMove, false);
      document.addEventListener('mouseup', this.mouseUp, false);
    }
  }

  private mouseUp = (event: any) => {
    event.preventDefault();
    this.firstCorner = undefined;
    this.end();
  }

  private touchMove = (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    event = event.changedTouches[0];

    this.updateMouseGround(event.clientX, event.clientY);
    this.dispatchEvent({ type: 'change' });
    this.checkSelectedObjects();
  }

  private touchStart = (event: any) => {
    event = event.changedTouches[0];

    this.updateMouseGround(event.clientX, event.clientY);
    this.initLine();

    document.addEventListener('mousemove', this.mouseMove, false);
    document.addEventListener('mouseup', this.mouseUp, false);
  }

  private touchEnd = (event: any) => {
    this.firstCorner = undefined;
    this.end();
  }

  private contextmenu = (event: any) => {
    event.preventDefault();
  }

  private updateMouseGround(clientX: number, clientY: number) {
    const rect = this.domElement.getBoundingClientRect();

    this.mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = - ((clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.cam);

    const intersects = this.raycaster.intersectObject(this.ground);
    if (intersects.length > 0) {
      this.mouseGround.x = intersects[0].point.x;
      this.mouseGround.y = intersects[0].point.y;
      this.mouseGround.z = intersects[0].point.z;
      this.updateLine();
    } else {
      // mouse is not over ground
      this.mouseGround.x = 0;
      this.mouseGround.y = 0;
      this.mouseGround.z = 0;
    }
  }

  private initLine() {
    // first corner of selection rectangle
    this.firstCorner = new Vector2();
    this.firstCorner.x = this.mouseGround.x;
    this.firstCorner.y = this.mouseGround.y;

    this.coords[0] = this.mouseGround.x;
    this.coords[1] = this.mouseGround.y;
    this.coords[2] = 1;

    this.coords[3] = this.mouseGround.x;
    this.coords[4] = this.mouseGround.y;
    this.coords[5] = 1;

    this.coords[6] = this.mouseGround.x;
    this.coords[7] = this.mouseGround.y;
    this.coords[8] = 1;

    this.coords[9] = this.mouseGround.x;
    this.coords[10] = this.mouseGround.y;
    this.coords[11] = 1;

    this.coords[12] = this.mouseGround.x;
    this.coords[13] = this.mouseGround.y;
    this.coords[14] = 1;

    this.line.visible = true;
  }

  private updateLine() {
    this.coords[4] = this.mouseGround.y;
    this.coords[6] = this.mouseGround.x;
    this.coords[7] = this.mouseGround.y;
    this.coords[9] = this.mouseGround.x;
    // workaround for typescript error
    let geometry: any;
    geometry = this.line.geometry;
    geometry.attributes.position.needsUpdate = true;
  }

  /**
   * Dispatch an event if selection is changed.
   */
  private checkSelectedObjects(): void {
    const selected = this.getSelectedObjects();

    if (!this.setsEqual(this.selected, selected)) {
      const removed = this.setDifference(this.selected, selected);
      const added = this.setDifference(selected, this.selected);

      this.selected = selected;
      this.dispatchEvent({
        type: 'selected',
        selected: this.selected,
        added: added,
        removed: removed,
      });
    }
  }

  private getSelectedObjects(): Set<Object3D> {
    let x1 = this.coords[0];
    let y1 = this.coords[1];
    let x2 = this.coords[6];
    let y2 = this.coords[7];

    const selected = new Set<Object3D>();
    // make sure x1 < x2
    if (x1 > x2) {
      const tmp = x1;
      x1 = x2;
      x2 = tmp;
    }
    // make sure y1 < y2
    if (y1 > y2) {
      const tmp = y1;
      y1 = y2;
      y2 = tmp;
    }

    for (const obj of this.objects) {
      if (obj.position.x >= x1 && obj.position.x <= x2 &&
          obj.position.y >= y1 && obj.position.y <= y2) {
        selected.add(obj);
      }
    }
    return selected;
  }

  private setsEqual(a: Set<any>, b: Set<any>): boolean {
    if (a === b) { return true; }
    if (a.size !== b.size) { return false; }

    let equal = true;
    a.forEach(elem => {
      if (!b.has(elem)) {
        equal = false;
      }
    });
    return equal;
  }

  private setDifference(a: Set<Object3D>, b: Set<Object3D>): Set<Object3D> {
    const difference = new Set(a);

    b.forEach(elem => difference.delete(elem));
    return difference;
  }
}
