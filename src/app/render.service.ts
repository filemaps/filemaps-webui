// Copyright (C) 2017 File Maps Web UI Authors.
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Injectable } from '@angular/core';
import * as THREE from 'three';

import { DragControls } from './drag-controls';
import { TrackballControls } from './trackball-controls';

@Injectable()
export class RenderService {

  public camera: THREE.PerspectiveCamera;
  public controls: TrackballControls;
  public dragControls: DragControls;
  public ground: THREE.Mesh;
  public scene: THREE.Scene = new THREE.Scene();
  public antialias = false;
  private renderer: THREE.WebGLRenderer;
  private resources: THREE.Object3D[] = [];

  // for optimizing animation
  private animating = false;
  private animUntil: number;

  constructor() { }

  init(element: any) {
    // Camera
    this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 10000);
    this.camera.position.z = 1000;

    // Add lights
    this.scene.add(new THREE.AmbientLight(0x505050));

    this.renderer = new THREE.WebGLRenderer({ antialias: this.antialias });
    this.renderer.setClearColor(0xe0e0e0);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.sortObjects = false;
    this.renderer.shadowMap.enabled = true;
    // more performance:
    // this.renderer.shadowMap.type = THREE.PCFShadowMap;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0, 0, 100); // light shining from top
    light.castShadow = true;
    this.scene.add(light);

    light.shadow.mapSize.width = 512;
    light.shadow.mapSize.height = 512;
    const shadowCam = light.shadow.camera as THREE.OrthographicCamera;

    shadowCam.near = 0.5;
    shadowCam.far = 100;

    // size of shadow 'area'
    shadowCam.left = -2500;
    shadowCam.right = 2500;
    shadowCam.top = 2500;
    shadowCam.bottom = -2500;

    // for debugging: show shadow camera
    //this.scene.add(new THREE.CameraHelper(light.shadow.camera));

    // Ground
    const groundMaterial = new THREE.MeshLambertMaterial({ color: 0x808080 });
    this.ground = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(5000, 5000), groundMaterial
    );
    // ground.rotation.x = - Math.PI / 2; // rotate X/Y to X/Z
    this.ground.receiveShadow = true;
    this.scene.add(this.ground);

    // ground material
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load('assets/grid.png', function(texture) {
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(100, 100);
      groundMaterial.map = texture;
      groundMaterial.needsUpdate = true;
    });

    element.nativeElement.appendChild(this.renderer.domElement);

    // Controls
    this.controls = new TrackballControls(this.camera, this.renderer.domElement);
    this.controls.rotateSpeed = 1.0;
    this.controls.zoomSpeed = 1.6;
    this.controls.panSpeed = 0.8;
    this.controls.noZoom = false;
    this.controls.noPan = false;
    this.controls.staticMoving = true;
    this.controls.dynamicDampingFactor = 0.3;
    this.controls.keys = [ 65, 83, 68 ];
    this.controls.addEventListener('change', _ => this.onCameraChange());
    this.animate();

    // Drag controls
    this.dragControls = new DragControls(this.resources, this.camera, this.renderer.domElement);
    this.dragControls.addEventListener('dragstart', evt => this.onDragStart(evt));
    this.dragControls.addEventListener('dragend', evt => this.onDragEnd(evt));

    window.addEventListener('resize', _ => this.onWindowResize(), false);
    window.addEventListener('mousemove', _ => this.animate(), false);
  }

  /**
   * Animates at least for given time (ms).
   * Optimizes rendering to happen only when necessary, saving CPU.
   */
  public animate(duration = 1000) {
    const until = Date.now() + duration;
    if (this.animUntil < until) {
      this.animUntil = until;
    }
    if (!this.animating) {
      window.requestAnimationFrame(_ => this.render());
    }
  }

  public render() {
    this.controls.update();
    this.renderer.render(this.scene, this.camera);

    if (this.animUntil < Date.now()) {
      this.animating = false;
    } else {
      this.animating = true;
      window.requestAnimationFrame(_ => this.render());
    }
  }

  /**
   * Adds resource to scene and draws it.
   */
  public addResource(obj: THREE.Mesh) {
    this.scene.add(obj);
    this.resources.push(obj);
    this.animate();
  }

  private onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.controls.handleResize();
    this.animate();
  }

  private onCameraChange() {
    this.animate();
  }

  /**
   * Event when resource dragging starts.
   */
  private onDragStart(evt: any) {
    this.controls.enabled = false;
    evt.object.userData.resource.onDragStart();
  }

  /**
   * Event when resource dragging ends.
   */
  private onDragEnd(evt: any) {
    this.controls.enabled = true;
    evt.object.userData.resource.onDragEnd();
  }
}
