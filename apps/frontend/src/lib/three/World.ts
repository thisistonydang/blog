import { createPerspectiveCamera } from "./components-core/perspective-camera";
import { createRenderer } from "./components-core/renderer";
import { createScene } from "./components-core/scene";

import { EventsListener } from "./systems/EventsListener";
import { Gui } from "./systems/Gui";
import { Loop } from "./systems/Loop";
import { Resizer } from "./systems/Resizer";

import type { Object3D, PerspectiveCamera, Scene, WebGLRenderer } from "three";

export class World {
  scene: Scene;
  camera: PerspectiveCamera;
  renderer: WebGLRenderer;
  eventsListener: EventsListener;
  loop: Loop;
  gui: Gui;

  constructor(container: HTMLDivElement, showStats = false, showGui = false) {
    // Create core components
    this.scene = createScene();
    this.camera = createPerspectiveCamera();
    this.renderer = createRenderer();
    container.append(this.renderer.domElement);

    // Initialize systems
    new Resizer(container, this.camera, this.renderer);
    this.eventsListener = new EventsListener(
      this.renderer.domElement,
      this.camera
    );
    this.loop = new Loop(this.scene, this.camera, this.renderer, showStats);
    this.gui = new Gui(showGui);
  }

  /**
   * Add objects to scene and relevant systems
   */
  add(objects: Object3D[]): void {
    for (const object of objects) {
      this.scene.add(object);
      if (
        "onClick" in object ||
        "onPointerEnter" in object ||
        "onPointerLeave" in object
      ) {
        this.eventsListener.objectsToTest.push(object);
      }
      if ("tick" in object) {
        this.loop.tickables.push(object);
      }
      if ("updateGui" in object) {
        this.gui.tweakables.push(object);
      }
    }
  }

  render(): void {
    this.renderer.render(this.scene, this.camera);
  }

  start(): void {
    this.loop.start();
  }

  stop(): void {
    this.loop.stop();
  }
}
