// Copyright (C) 2017 File Maps Web UI Authors.
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Injectable } from '@angular/core';
import * as THREE from 'three';

import { TrackballControls } from './trackball-controls';

@Injectable()
export class RenderService {

  public camera: THREE.PerspectiveCamera;
  public controls: TrackballControls;
  public ground: THREE.Mesh;
  public scene: THREE.Scene = new THREE.Scene();
  private renderer: THREE.WebGLRenderer;

  // for optimizing animation
  private lastMoved = Date.now();
  private animating: boolean = false;
  private animTime = 2000; // ms

  constructor() { }

  init(element: any) {
    // Camera
    this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 10000);
    this.camera.position.z = 1000;

    // Create sphere
    const geometry = new THREE.SphereGeometry(5, 50, 50);
    const material = new THREE.MeshNormalMaterial();
    const sphere = new THREE.Mesh(geometry, material);
    this.scene.add(sphere);

    // Create box
    const geometry2 = new THREE.BoxGeometry(50, 50, 50);
    const material2 = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
    const box = new THREE.Mesh(geometry2, material2);
    box.position.set(60, 0, 0);
    this.scene.add(box);

    // Add lights
    this.scene.add(new THREE.AmbientLight(0x505050));

    const light = new THREE.SpotLight(0xffffff, 1.5);
    light.position.set(0, 70, 2000);
    light.castShadow = true;

    light.shadow = new THREE.SpotLightShadow(new THREE.PerspectiveCamera(90, 1, 200, 10000));
    light.shadow.bias = - 0.00022;

    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;

    this.scene.add(light);

    // Ground
    const groundMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
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

    this.renderer = new THREE.WebGLRenderer({ antialias: false });
    this.renderer.setClearColor(0xe0e0e0);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.sortObjects = false;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;

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

    window.addEventListener('resize', _ => this.onWindowResize(), false);
    window.addEventListener('mousemove', _ => this.animate(), false);
  }

  // Optimize rendering to happen only when necessary, saving CPU
  public animate() {
    this.lastMoved = Date.now();
    if (!this.animating) {
      window.requestAnimationFrame(_ => this.render());
    }
  }

  public render() {
    this.controls.update();
    this.renderer.render(this.scene, this.camera);

    if (this.lastMoved + this.animTime < Date.now()) {
      this.animating = false;
    }
    else {
      this.animating = true;
      window.requestAnimationFrame(_ => this.render());
    }
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

}
