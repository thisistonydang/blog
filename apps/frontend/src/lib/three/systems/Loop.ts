import { Clock } from "three";

import type { Camera, Mesh, Scene, WebGLRenderer } from "three";

export interface UpdatableMesh extends Mesh {
  tick: (delta: number) => void;
}

const clock = new Clock();

export class Loop {
  scene: Scene;
  camera: Camera;
  renderer: WebGLRenderer;
  updatables: UpdatableMesh[];

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
