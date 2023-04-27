import { Clock } from "three";
import { isPatched } from "../types/Patched";
import { Statistics } from "./Statistics";

import type {
  Camera,
  EventDispatcher,
  Object3D,
  Scene,
  WebGLRenderer,
} from "three";

type Tickable = EventDispatcher | Object3D;

const clock = new Clock();

export class Loop {
  scene: Scene;
  camera: Camera;
  renderer: WebGLRenderer;
  tickables: Tickable[];
  statistics: Statistics | null;

  constructor(
    scene: Scene,
    camera: Camera,
    renderer: WebGLRenderer,
    tickables: Tickable[],
    showStats = false
  ) {
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.tickables = tickables;
    this.statistics = showStats ? new Statistics(this.renderer) : null;
  }

  start() {
    this.renderer.setAnimationLoop(() => {
      this.statistics?.begin();

      // Tell every tickable object to tick forward one frame
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

    this.tickables.forEach((tickable) => {
      if (isPatched(tickable) && "tick" in tickable) {
        tickable.tick(delta);
      }
    });
  }
}
