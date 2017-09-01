/**
 * Based on three.js TrackballControls.js from
 * https://github.com/mrdoob/three.js/blob/dev/examples/js/controls/TrackballControls.js
 *
 * @author Tuomas Jaakola http://github.com/iqqmut
 */

import { Camera, Event, EventDispatcher, Quaternion, Vector2, Vector3 } from 'three';

const enum State {
  None = -1,
  Pan,
  Zoom,
  Rotate,
  TouchRotate,
  TouchZoomPan
}

class ChangeEvent implements Event {
  type = 'change';
  target: any;
}

class StartEvent implements Event {
  type = 'start';
  target: any;
}

class EndEvent implements Event {
  type = 'end';
  target: any;
}

export class TrackballControls extends EventDispatcher {

  public enabled = true;
  public rotateSpeed = 1.0;
  public zoomSpeed = 1.2;
  public panSpeed = 0.3;
  public noRotate = false;
  public noZoom = false;
  public noPan = false;
  public staticMoving = false;
  public dynamicDampingFactor = 0.2;
  public minDistance = 0;
  public maxDistance = Infinity;
  public keys = [ 65, 83, 68 ]; // A, S, D

  private screen = {
    left: 0,
    top: 0,
    width: 0,
    height: 0
  };
  private target = new Vector3();
  private EPS = 0.000001;
  private lastPosition = new Vector3();
  private state = State.None;
  private prevState = State.None;
  private eye = new Vector3();
  private movePrev = new Vector2();
  private moveCurr = new Vector2();
  private lastAxis = new Vector3();
  private lastAngle = 0;
  private zoomStart = new Vector2();
  private zoomEnd = new Vector2();
  private touchZoomDistanceStart = 0;
  private touchZoomDistanceEnd = 0;
  private panStart = new Vector2();
  private panEnd = new Vector2();

  // for reset
  private target0 = this.target.clone();
  private position0 = this.cam.position.clone();
  private up0 = this.cam.up.clone();

  // for rotateCamera()
  private rotAxis = new Vector3();
  private rotQuaternion = new Quaternion();
  private rotEyeDirection = new Vector3();
  private rotObjUpDirection = new Vector3();
  private rotObjSidewaysDirection = new Vector3();
  private rotMoveDirection = new Vector3();

  // for panCamera()
  private panMouseChange = new Vector2();
  private panObjUp = new Vector3();
  private panVector = new Vector3();

  private mouseOnScreenVector = new Vector2();
  private mouseOnCircleVector = new Vector2();

  constructor(private cam: Camera, private domElement?: HTMLElement) {
    super();

    let elem: any;
    if (this.domElement === undefined) {
      elem = document;
    } else {
      elem = this.domElement;
    }
    elem.addEventListener('contextmenu', this.contextmenu, false);
    elem.addEventListener('mousedown', this.mousedown, false);
    elem.addEventListener('wheel', this.mousewheel, false);

    elem.addEventListener('touchstart', this.touchstart, false);
    elem.addEventListener('touchend', this.touchend, false);
    elem.addEventListener('touchmove', this.touchmove, false);

    window.addEventListener('keydown', this.keydown, false);
    window.addEventListener('keyup', this.keyup, false);

    this.handleResize();

    // force an update at start
    this.update();
  }

  public dispose() {
    let elem: any;
    if (this.domElement === undefined) {
      elem = document;
    } else {
      elem = this.domElement;
    }
    elem.removeEventListener('contextmenu', this.contextmenu, false);
    elem.removeEventListener('mousedown', this.mousedown, false);
    elem.removeEventListener('wheel', this.mousewheel, false);

    elem.removeEventListener('touchstart', this.touchstart, false);
    elem.removeEventListener('touchend', this.touchend, false);
    elem.removeEventListener('touchmove', this.touchmove, false);

    document.removeEventListener('mousemove', this.mousemove, false);
    document.removeEventListener('mouseup', this.mouseup, false);

    window.addEventListener('keydown', this.keydown, false);
    window.addEventListener('keyup', this.keyup, false);
  }

  public handleResize() {
    if (this.domElement === undefined) {
      this.screen.left = 0;
      this.screen.top = 0;
      this.screen.width = window.innerWidth;
      this.screen.height = window.innerHeight;
    } else {
      const box = this.domElement.getBoundingClientRect();
      const d = this.domElement.ownerDocument.documentElement;
      this.screen.left = box.left + window.pageXOffset - d.clientLeft;
      this.screen.top = box.top + window.pageYOffset - d.clientTop;
      this.screen.width = box.width;
      this.screen.height = box.height;
    }
  }

  public handleEvent(event: any) {
    if (typeof this[event.type] === 'function') {
      this[event.type](event);
    }
  }

  public rotateCamera() {
    let angle: number;
    this.rotMoveDirection.set(this.moveCurr.x - this.movePrev.x, this.moveCurr.y - this.movePrev.y, 0);
    angle = this.rotMoveDirection.length();

    if (angle) {
      this.eye.copy(this.cam.position).sub(this.target);

      this.rotEyeDirection.copy(this.eye).normalize();
      this.rotObjUpDirection.copy(this.cam.up).normalize();
      this.rotObjSidewaysDirection.crossVectors(this.rotObjUpDirection, this.rotEyeDirection).normalize();

      this.rotObjUpDirection.setLength(this.moveCurr.y - this.movePrev.y);
      this.rotObjSidewaysDirection.setLength(this.moveCurr.x - this.movePrev.x);

      this.rotMoveDirection.copy(this.rotObjUpDirection.add(this.rotObjSidewaysDirection));

      this.rotAxis.crossVectors(this.rotMoveDirection, this.eye).normalize();

      angle *= this.rotateSpeed;
      this.rotQuaternion.setFromAxisAngle(this.rotAxis, angle);

      this.eye.applyQuaternion(this.rotQuaternion);
      this.cam.up.applyQuaternion(this.rotQuaternion);

      this.lastAxis.copy(this.rotAxis);
      this.lastAngle = angle;

    } else if (!this.staticMoving && this.lastAngle) {
      this.lastAngle *= Math.sqrt(1.0 - this.dynamicDampingFactor);
      this.eye.copy(this.cam.position).sub(this.target);
      this.rotQuaternion.setFromAxisAngle(this.lastAxis, this.lastAngle);
      this.eye.applyQuaternion(this.rotQuaternion);
      this.cam.up.applyQuaternion(this.rotQuaternion);
    }
    this.movePrev.copy(this.moveCurr);
  }

  public zoomCamera() {
    let factor: number;
    if (this.state === State.TouchZoomPan) {
      factor = this.touchZoomDistanceStart / this.touchZoomDistanceEnd;
      this.touchZoomDistanceStart = this.touchZoomDistanceEnd;
      this.eye.multiplyScalar(factor);
    } else {
      factor = 1.0 + (this.zoomEnd.y - this.zoomStart.y) * this.zoomSpeed;
      if (factor !== 1.0 && factor > 0.0) {
        this.eye.multiplyScalar(factor);
      }
      if (this.staticMoving) {
        this.zoomStart.copy(this.zoomEnd);
      } else {
        this.zoomStart.y += (this.zoomEnd.y - this.zoomStart.y) * this.dynamicDampingFactor;
      }
    }
  }

  public panCamera() {
    this.panMouseChange.copy(this.panEnd).sub(this.panStart);
    if (this.panMouseChange.lengthSq()) {
      this.panMouseChange.multiplyScalar(this.eye.length() * this.panSpeed);

      this.panVector.copy(this.eye).cross(this.cam.up).setLength(this.panMouseChange.x);
      this.panVector.add(this.panObjUp.copy(this.cam.up).setLength(this.panMouseChange.y));

      this.cam.position.add(this.panVector);
      this.target.add(this.panVector);

      if (this.staticMoving) {
        this.panStart.copy(this.panEnd);
      } else {
        this.panStart.add(this.panMouseChange.subVectors(this.panEnd, this.panStart).multiplyScalar(this.dynamicDampingFactor));
      }
    }
  }

  public checkDistances() {
    if (!this.noZoom || !this.noPan) {
      if (this.eye.lengthSq() > this.maxDistance * this.maxDistance) {
        this.cam.position.addVectors(this.target, this.eye.setLength(this.maxDistance));
        this.zoomStart.copy(this.zoomEnd);
      }

      if (this.eye.lengthSq() < this.minDistance * this.minDistance) {
        this.cam.position.addVectors(this.target, this.eye.setLength(this.minDistance));
        this.zoomStart.copy(this.zoomEnd);
      }
    }
  }

  public update() {
    this.eye.subVectors(this.cam.position, this.target);
    if (!this.noRotate) {
      this.rotateCamera();
    }

    if (!this.noZoom) {
      this.zoomCamera();
    }

    if (!this.noPan) {
      this.panCamera();
    }

    this.cam.position.addVectors(this.target, this.eye);
    this.checkDistances();
    this.cam.lookAt(this.target);

    if (this.lastPosition.distanceToSquared(this.cam.position) > this.EPS) {
      this.dispatchEvent(new ChangeEvent());
      this.lastPosition.copy(this.cam.position);
    }
  }

  public reset() {
    this.state = State.None;
    this.prevState = State.None;

    this.target.copy(this.target0);
    this.cam.position.copy(this.position0);
    this.cam.up.copy(this.up0);

    this.eye.subVectors(this.cam.position, this.target);

    this.cam.lookAt(this.target);

    this.dispatchEvent(new ChangeEvent());

    this.lastPosition.copy(this.cam.position);
  }

  // listeners

  private keydown = (event: any) => {
    if (this.enabled === false) { return; }

    window.removeEventListener('keydown', this.keydown);

    this.prevState = this.state;

    if (this.state !== State.None) {
      return;
    } else if (event.keyCode === this.keys[State.Rotate] && !this.noRotate) {
      this.state = State.Rotate;
    } else if (event.keyCode === this.keys[State.Zoom] && !this.noZoom) {
      this.state = State.Zoom;
    } else if (event.keyCode === this.keys[State.Pan] && !this.noPan) {
      this.state = State.Pan;
    }
  }

  private keyup = (event: any) => {
    if (this.enabled === false) { return; }
    this.state = this.prevState;
    window.addEventListener('keydown', this.keydown, false);
  }

  private mousedown = (event: any) => {
    if (this.enabled === false) { return; }
    event.preventDefault();
    event.stopPropagation();

    if (this.state === State.None) {
      this.state = event.button;
    }

    if (this.state === State.Rotate && !this.noRotate) {
      this.moveCurr.copy(this.getMouseOnCircle(event.pageX, event.pageY));
      this.movePrev.copy(this.moveCurr);
    } else if (this.state === State.Zoom && !this.noZoom) {
      this.zoomStart.copy(this.getMouseOnScreen(event.pageX, event.pageY));
      this.zoomEnd.copy(this.zoomStart);
    } else if (this.state === State.Pan && !this.noPan) {
      this.panStart.copy(this.getMouseOnScreen(event.pageX, event.pageY));
      this.panEnd.copy(this.panStart);
    }

    document.addEventListener('mousemove', this.mousemove, false);
    document.addEventListener('mouseup', this.mouseup, false);

    this.dispatchEvent(new StartEvent());
  }

  private mousemove = (event: any) => {
    if (this.enabled === false) { return; }
    event.preventDefault();
    event.stopPropagation();

    if (this.state === State.Rotate && !this.noRotate) {
      this.movePrev.copy(this.moveCurr);
      this.moveCurr.copy(this.getMouseOnCircle(event.pageX, event.pageY));
    } else if (this.state === State.Zoom && !this.noZoom) {
      this.zoomEnd.copy(this.getMouseOnScreen(event.pageX, event.pageY));
    } else if (this.state === State.Pan && !this.noPan) {
      this.panEnd.copy(this.getMouseOnScreen(event.pageX, event.pageY));
    }
  }

  private mouseup = (event: any) => {
    if (this.enabled === false) { return; }
    event.preventDefault();
    event.stopPropagation();

    this.state = State.None;

    document.removeEventListener('mousemove', this.mousemove);
    document.removeEventListener('mouseup', this.mouseup);

    this.dispatchEvent(new EndEvent());
  }

  private mousewheel = (event: any) => {
    if (this.enabled === false) { return; }
    event.preventDefault();
    event.stopPropagation();

    switch (event.deltaMode) {
      case 2:
        // Zoom in pages
        this.zoomStart.y -= event.deltaY * 0.025;
        break;

      case 1:
        // Zoom in lines
        this.zoomStart.y -= event.deltaY * 0.01;
        break;

      default:
        // undefined, 0, assume pixels
        this.zoomStart.y -= event.deltaY * 0.00025;
        break;
    }
    this.dispatchEvent(new StartEvent());
    this.dispatchEvent(new EndEvent());
  }

  private touchstart = (event: any) => {
    if (this.enabled === false) { return; }

    switch (event.touches.length) {
      case 1:
        this.state = State.TouchRotate;
        this.moveCurr.copy(this.getMouseOnCircle(event.touches[0].pageX, event.touches[0].pageY));
        this.movePrev.copy(this.moveCurr);
        break;

      default: // 2 or more
        this.state = State.TouchZoomPan;
        const dx = event.touches[0].pageX - event.touches[1].pageX;
        const dy = event.touches[0].pageY - event.touches[1].pageY;
        this.touchZoomDistanceEnd = this.touchZoomDistanceStart = Math.sqrt(dx * dx + dy * dy);

        const x = (event.touches[0].pageX + event.touches[1].pageX) / 2;
        const y = (event.touches[0].pageY + event.touches[1].pageY) / 2;
        this.panStart.copy(this.getMouseOnScreen(x, y));
        this.panEnd.copy(this.panStart);
        break;
    }
    this.dispatchEvent(new StartEvent());
  }

  private touchmove = (event: any) => {
    if (this.enabled === false) { return; }

    event.preventDefault();
    event.stopPropagation();

    switch (event.touches.length) {
      case 1:
        this.movePrev.copy(this.moveCurr);
        this.moveCurr.copy(this.getMouseOnCircle(event.touches[0].pageX, event.touches[0].pageY));
        break;

      default: // 2 or more
        const dx = event.touches[0].pageX - event.touches[1].pageX;
        const dy = event.touches[0].pageY - event.touches[1].pageY;
        this.touchZoomDistanceEnd = Math.sqrt(dx * dx + dy * dy);

        const x = (event.touches[0].pageX + event.touches[1].pageX) / 2;
        const y = (event.touches[0].pageY + event.touches[1].pageY) / 2;
        this.panEnd.copy(this.getMouseOnScreen(x, y));
    }
  }

  private touchend = (event: any) => {
    if (this.enabled === false) { return; }

    switch (event.touches.length) {
      case 0:
        this.state = State.None;
        break;

        case 1:
          this.state = State.TouchRotate;
          this.moveCurr.copy(this.getMouseOnCircle(event.touches[0].pageX, event.touches[0].pageY));
          this.movePrev.copy(this.moveCurr);
    }
    this.dispatchEvent(new EndEvent());
  }

  private contextmenu = (event: any) => {
    if (this.enabled === false) { return; }
    event.preventDefault();
  }

  private getMouseOnScreen(pageX: number, pageY: number): Vector2 {
    this.mouseOnScreenVector.set(
      (pageX - this.screen.left) / this.screen.width,
      (pageY - this.screen.top) / this.screen.height
    );
    return this.mouseOnScreenVector;
  }

  private getMouseOnCircle(pageX: number, pageY: number): Vector2 {
    this.mouseOnCircleVector.set(
      ((pageX - this.screen.width * 0.5 - this.screen.left) / (this.screen.width * 0.5)),
      ((this.screen.height + 2 * (this.screen.top - pageY)) / this.screen.width ) // screen.width intentional
    );
    return this.mouseOnCircleVector;
  }
}
