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

export type Frameloop = "always" | "demand";
type Tickable = EventDispatcher | Object3D;

const clock = new Clock();

export class Loop {
  scene: Scene;
  camera: Camera;
  renderer: WebGLRenderer;
  tickables: Tickable[] = [];
  statistics: Statistics | null = null;
  frameloop: Frameloop = "demand";
  renderRequested = false;

  constructor({ scene, camera, renderer }: World) {
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.statistics = new Statistics(this.renderer);
  }

  requestRender = (): void => {
    if (this.frameloop === "always" || this.renderRequested) return;

    // Set renderRequested = true to prevent more than one render from being
    // requested at a time.
    this.renderRequested = true;

    const render = (): void => {
      // Reset renderRequested when a frame finally renders. This must be set
      // BEFORE calling tick so that OrbitControls' tick function can request
      // additional renders for damping.
      this.renderRequested = false;

      this.tick();
      this.renderer.render(this.scene, this.camera);
    };
    requestAnimationFrame(render);
  };

  /**
   * Run animation loop while the given condition is true.
   *
   * @param condition - A function that is evaluated with each render to see if
   * requestanimationframe should be called again.
   *
   * @param action - An optional function that is called with each render.
   * Typically, this function would change some state that would eventually lead
   * the condition to evaluate to false and end the animation loop. If this
   * function is not provided, be sure that the condition has some other means
   * of eventually evaluating to false or the animation loop will be infinite.
   */
  runWhile(condition: () => boolean, action?: () => void): void {
    if (this.frameloop === "always") return;

    const tick = () => {
      if (condition()) {
        if (action) action();
        this.requestRender();
        requestAnimationFrame(tick);
      }
    };

    tick();
  }

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
        tickable.tick({ delta, frameloop: this.frameloop });
      }
    });
  }

  updateGui({ devFolder }: Gui): void {
    devFolder
      .add(this, "frameloop", ["always", "demand"])
      .onChange((frameloop: Frameloop) => {
        frameloop === "always" ? this.start() : this.stop();
      });
  }
}
