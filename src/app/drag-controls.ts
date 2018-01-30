/**
 * Based on three.js DragControls.js from
 * https://github.com/mrdoob/three.js/blob/f9cfac468aefcc815a41fa0a4f619d42431cbd9f/examples/js/controls/DragControls.js
 *
 * @author Tuomas Jaakola http://github.com/iqqmut
 */

import { Camera, Event, EventDispatcher, Object3D, Plane, Raycaster, Vector2, Vector3 } from 'three';

export class DragControls extends EventDispatcher {

  public enabled = true;

  // set plane static so objects will move on ground
  private plane = new Plane(new Vector3(0, 0, 1));
  private raycaster = new Raycaster();
  private mouse = new Vector2();
  private offset = new Vector3();
  private intersection = new Vector3();
  private selected: Object3D;
  private hovered: Object3D;

  constructor(
    private objects: Object3D[],
    private cam: Camera,
    private domElement?: HTMLElement
  ) {
    super();
    this.activate();
  }

  public activate() {
    this.domElement.addEventListener('mousemove', this.mouseMove, false);
    this.domElement.addEventListener('mousedown', this.mouseDown, false);
    this.domElement.addEventListener('mouseup', this.mouseCancel, false);
    this.domElement.addEventListener('mouseleave', this.mouseCancel, false);
    this.domElement.addEventListener('touchmove', this.touchMove, false);
    this.domElement.addEventListener('touchstart', this.touchStart, false);
    this.domElement.addEventListener('touchend', this.touchEnd, false);
  }

  public deactivate() {
    this.domElement.removeEventListener('mousemove', this.mouseMove, false);
    this.domElement.removeEventListener('mousedown', this.mouseDown, false);
    this.domElement.removeEventListener('mouseup', this.mouseCancel, false);
    this.domElement.removeEventListener('mouseleave', this.mouseCancel, false);
    this.domElement.removeEventListener('touchmove', this.touchMove, false);
    this.domElement.removeEventListener('touchstart', this.touchStart, false);
    this.domElement.removeEventListener('touchend', this.touchEnd, false);
  }

  public dispose() {
    this.deactivate();
  }

  private mouseMove = (event: any) => {
    event.preventDefault();

    const rect = this.domElement.getBoundingClientRect();

    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = - ((event.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.cam);

    if (this.selected && this.enabled) {
      if (this.raycaster.ray.intersectPlane(this.plane, this.intersection)) {
        this.selected.position.copy(this.intersection.sub(this.offset));
      }
      this.dispatchEvent({ type: 'drag', object: this.selected });
      return;
    }

    this.raycaster.setFromCamera(this.mouse, this.cam);

    const intersects = this.raycaster.intersectObjects(this.objects);

    if (intersects.length > 0) {
      const object = intersects[0].object;

      if (this.hovered !== object) {
        this.dispatchEvent({
          type: 'hoveron',
          object: object,
          originalEvent: event,
        });

        this.domElement.style.cursor = 'pointer';
        this.hovered = object;
      }
    } else {
      if (this.hovered !== null) {
        this.dispatchEvent({
          type: 'hoveroff',
          object: this.hovered,
          originalEvent: event,
        });

        this.domElement.style.cursor = 'auto';
        this.hovered = null;
      }
    }
  }

  private mouseDown = (event: any) => {
    event.preventDefault();

    this.raycaster.setFromCamera(this.mouse, this.cam);

    const intersects = this.raycaster.intersectObjects(this.objects);

    if (intersects.length > 0) {
      this.selected = intersects[0].object;

      if (this.raycaster.ray.intersectPlane(this.plane, this.intersection)) {
        this.offset.copy(this.intersection).sub(this.selected.position);
      }

      this.domElement.style.cursor = 'move';

      this.dispatchEvent({ type: 'dragstart', object: this.selected });
    }
  }

  private mouseCancel = (event: any) => {
    event.preventDefault();

    if (this.selected) {
      this.dispatchEvent({ type: 'dragend', object: this.selected });
      this.selected = null;
    }
    this.domElement.style.cursor = 'auto';
  }


  private touchMove = (event: any) => {
    event.preventDefault();
    event = event.changedTouches[0];

    const rect = this.domElement.getBoundingClientRect();

    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = - ((event.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.cam);

    if (this.selected && this.enabled) {
      if (this.raycaster.ray.intersectPlane(this.plane, this.intersection)) {
        this.selected.position.copy(this.intersection.sub(this.offset));
      }
      this.dispatchEvent({ type: 'drag', object: this.selected });
      return;
    }
  }

  private touchStart = (event: any) => {
    event.preventDefault();
    event = event.changedTouches[0];

    const rect = this.domElement.getBoundingClientRect();

    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = - ((event.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.cam);

    const intersects = this.raycaster.intersectObjects(this.objects);
    if (intersects.length > 0) {
      this.selected = intersects[0].object;

      if (this.raycaster.ray.intersectPlane(this.plane, this.intersection)) {
        this.offset.copy(this.intersection).sub(this.selected.position);
      }
      this.domElement.style.cursor = 'move';
      this.dispatchEvent({ type: 'dragstart', object: this.selected });
    }
  }

  private touchEnd = (event: any) => {
    event.preventDefault();
    if (this.selected) {
      this.dispatchEvent({ type: 'dragend', object: this.selected });
      this.selected = null;
    }
    this.domElement.style.cursor = 'auto';
  }
}
