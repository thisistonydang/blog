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
import type { World } from "../World";
import type { Gui } from "./Gui";

type Tickable = EventDispatcher | Object3D;

const clock = new Clock();

export class Loop {
  scene: Scene;
  camera: Camera;
  renderer: WebGLRenderer;
  tickables: Tickable[] = [];
  statistics: Statistics | null = null;
  frameloop: "always" | "demand" = "demand";
  renderRequested = false;

  constructor({ scene, camera, renderer }: World) {
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.statistics = new Statistics(this.renderer);
  }

  requestRender = (): void => {
    if (this.renderRequested) return;

    // Set renderRequested = true to prevent more than one render from being
    // requested at a time.
    this.renderRequested = true;

    const render = (): void => {
      this.tick();
      this.renderer.render(this.scene, this.camera);

      // Reset renderRequested when a frame finally renders.
      this.renderRequested = false;
    };
    requestAnimationFrame(render);
  };

  start(): void {
    this.frameloop = "always";
    this.renderer.setAnimationLoop(() => {
      this.statistics?.begin();

      this.tick();
      this.renderer.render(this.scene, this.camera);

      this.statistics?.end();
      this.statistics?.updateCustomPanels();
    });
  }

  stop(): void {
    this.frameloop = "demand";
    this.renderer.setAnimationLoop(null);
  }

  tick(): void {
    const delta = clock.getDelta();

    this.tickables.forEach((tickable) => {
      if (isPatched(tickable) && "tick" in tickable) {
        tickable.tick(delta);
      }
    });
  }

  updateGui({ devFolder }: Gui): void {
    devFolder
      .add(this, "frameloop", ["always", "demand"])
      .onChange((frameloop: "always" | "demand") => {
        frameloop === "always" ? this.start() : this.stop();
      });
  }
}
