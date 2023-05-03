import { createPerspectiveCamera } from "./components-core/perspective-camera";
import { createRenderer } from "./components-core/renderer";
import { createScene } from "./components-core/scene";

import { Gui } from "./systems/Gui";
import { Loop } from "./systems/Loop";
import { Pointer } from "./systems/Pointer";
import { Resizer } from "./systems/Resizer";

import type { Object3D, PerspectiveCamera, Scene, WebGLRenderer } from "three";

export class World {
  scene: Scene;
  camera: PerspectiveCamera;
  renderer: WebGLRenderer;
  pointer: Pointer;
  loop: Loop;
  gui: Gui | null = null;

  constructor(container: HTMLDivElement) {
    // Create core components
    this.scene = createScene();
    this.camera = createPerspectiveCamera();
    this.renderer = createRenderer();
    container.append(this.renderer.domElement);

    // Initialize systems
    new Resizer(this, container);
    this.pointer = new Pointer(this);
    this.loop = new Loop(this);
    this.gui = new Gui(this);
  }

  /**
   * Add objects to root scene and relevant systems
   */
  addObjects(objects: Object3D[]): void {
    objects.forEach((object) => {
      this.scene.add(object);
      this.updateSystems(object);
    });
  }

  /**
   * Add an object to relevant systems
   */
  updateSystems(object: Object3D): void {
    if (
      "onClick" in object ||
      "onPointerEnter" in object ||
      "onPointerLeave" in object
    ) {
      this.pointer.objectsToTest.push(object);
    }
    if ("tick" in object) {
      this.loop.tickables.push(object);
    }
    if ("updateGui" in object) {
      this.gui?.tweakables.push(object);
    }
  }

  requestRender(): void {
    this.loop.requestRender();
  }

  start(): void {
    this.loop.start();
  }

  stop(): void {
    this.loop.stop();
  }
}
