import { Clock } from "three";

import type { Camera, Mesh, Scene, WebGLRenderer } from "three";
import type { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import type { TrackballControls } from "three/examples/jsm/controls/TrackballControls";

type Tick = (delta: number) => void;

export interface UpdatableMesh extends Mesh {
  tick: Tick;
}

export interface UpdatableOrbitControls extends OrbitControls {
  tick: Tick;
}

export interface UpdatableTrackballControls extends TrackballControls {
  tick: Tick;
}

type UpdatableObject =
  | UpdatableMesh
  | UpdatableOrbitControls
  | UpdatableTrackballControls;

const clock = new Clock();

export class Loop {
  scene: Scene;
  camera: Camera;
  renderer: WebGLRenderer;
  updatables: UpdatableObject[];

  constructor(scene: Scene, camera: Camera, renderer: WebGLRenderer) {
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.updatables = [];
  }

  start() {
    this.renderer.setAnimationLoop(() => {
      // Tell every animated object to tick forward one frame
      this.tick();

      // Render a frame
      this.renderer.render(this.scene, this.camera);
    });
  }

  stop() {
    this.renderer.setAnimationLoop(null);
  }

  tick() {
    const delta = clock.getDelta();

    for (const object of this.updatables) {
      object.tick(delta);
    }
  }
}
