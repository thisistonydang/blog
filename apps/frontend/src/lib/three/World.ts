import { Object3D } from "three";

import { createRenderer } from "./components-core/renderer";
import { createScene } from "./components-core/scene";

import { Gui } from "./systems/Gui";
import { Loop } from "./systems/Loop";
import { Resizer } from "./systems/Resizer";

import type {
  EventDispatcher,
  OrthographicCamera,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three";
import type { Physics2D } from "./systems/Physics/Physics2D";
import type { Physics3D } from "./systems/Physics/Physics3D";
import type { Pointer } from "./systems/Pointer/Pointer";
import type { PostProcessor } from "./systems/PostProcessor";

export class World {
  camera: OrthographicCamera | PerspectiveCamera;
  scene: Scene;
  renderer: WebGLRenderer;
  loop: Loop;
  pointer: Pointer | null = null;
  physics: Physics2D | Physics3D | null = null;
  postProcessor: PostProcessor | null = null;
  gui: Gui | null = null;

  constructor({
    camera,
    container,
    minAspectRatio = 1,
    pointer,
    physics,
    postProcessor,
  }: {
    camera: OrthographicCamera | PerspectiveCamera;
    container: HTMLDivElement;
    minAspectRatio?: number;
    pointer?: typeof Pointer;
    physics?: typeof Physics2D | typeof Physics3D;
    postProcessor?: typeof PostProcessor;
  }) {
    // Create core components
    this.camera = camera;
    this.scene = createScene();
    this.renderer = createRenderer();
    container.append(this.renderer.domElement);

    // Add core systems
    new Resizer(this, container, minAspectRatio);
    this.loop = new Loop(this);

    // Add optional pointer
    if (pointer) {
      this.pointer = new pointer(this);
    }

    // Add optional physics
    if (physics) {
      this.physics = new physics(this);
      this.loop.tickables.push(this.physics);
    }

    // Add optional post processing
    if (postProcessor) {
      this.postProcessor = new postProcessor(this, container);
    }

    // Add optional GUI
    this.gui = new Gui(this);
  }

  addObjects(objects: (EventDispatcher | Object3D)[]): void {
    // Add objects to root scene and relevant systems
    objects.forEach((object) => {
      if (object instanceof Object3D) {
        this.scene.add(object);
      }
      this.updateSystems(object);
    });

    // Initialize physics and GUI after all objects have been added
    this.physics?.init();
    this.gui?.init();
  }

  /**
   * Add an object to relevant systems
   */
  updateSystems(object: EventDispatcher | Object3D): void {
    if (object instanceof Object3D) {
      if ("addPhysics2D" in object || "addPhysics3D" in object) {
        this.physics?.objects.push(object);
      }

      if ("onCollisionEnter" in object) {
        this.physics?.collisionEnterObjects.push(object);
      }
      if ("onCollisionExit" in object) {
        this.physics?.collisionExitObjects.push(object);
      }
      if ("onSleep" in object || "onWake" in object) {
        this.physics?.sleepAndWakeObjects.push(object);
      }

      if (
        "onClick" in object ||
        "onPointerEnter" in object ||
        "onPointerLeave" in object
      ) {
        this.pointer?.objectsToTest.push(object);
      }
    }

    if ("tickOnRenderRequest" in object || "tickOnWorldStart" in object) {
      this.loop.tickables.push(object);
    }

    if ("updateGui" in object) {
      this.gui?.tweakables.push(object);
    }
  }

  requestRender(): void {
    this.loop.requestRender();
  }

  runWhileAwake(): void {
    this.physics?.runWhileAwake();
  }

  start(): void {
    this.loop.start();
  }

  stop(): void {
    this.loop.stop();
  }
}
