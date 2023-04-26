import { Clock } from "three";
import { Statistics } from "./Statistics";

import type { Camera, Scene, WebGLRenderer } from "three";
import type { UpdatableObject } from "./Loop.types";

const clock = new Clock();

export class Loop {
  scene: Scene;
  camera: Camera;
  renderer: WebGLRenderer;
  updatables: UpdatableObject[];
  statistics: Statistics | null;

  constructor(
    scene: Scene,
    camera: Camera,
    renderer: WebGLRenderer,
    updatables: UpdatableObject[],
    stats = false
  ) {
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.updatables = updatables;
    this.statistics = stats ? new Statistics(this.renderer) : null;
  }

  start() {
    this.renderer.setAnimationLoop(() => {
      this.statistics?.begin();

      // Tell every animated object to tick forward one frame
      this.tick();

      // Render a frame
      this.renderer.render(this.scene, this.camera);

      this.statistics?.end();
      this.statistics?.updateCustomPanels();
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
