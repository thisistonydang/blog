import { Object3D } from "three";

import { createRenderer } from "./components-core/renderer";
import { createScene } from "./components-core/scene";

import { Gui } from "./systems/Gui";
import { Loop } from "./systems/Loop";
import { Physics2D } from "./systems/Physics/Physics2D";
import { Physics3D } from "./systems/Physics/Physics3D";
import { Pointer } from "./systems/Pointer";
import { Resizer } from "./systems/Resizer";

import type {
  EventDispatcher,
  OrthographicCamera,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three";
import type { Rapier2D } from "./types/Rapier2D";
import type { Rapier3D } from "./types/Rapier3D";

export class World {
  camera: OrthographicCamera | PerspectiveCamera;
  scene: Scene;
  renderer: WebGLRenderer;
  pointer: Pointer;
  loop: Loop;
  physics: Physics2D | Physics3D | null = null;
  gui: Gui | null = null;

  constructor({
    camera,
    container,
    minAspectRatio = 1,
    RAPIER,
  }: {
    camera: OrthographicCamera | PerspectiveCamera;
    container: HTMLDivElement;
    minAspectRatio?: number;
    RAPIER?: Rapier2D | Rapier3D;
  }) {
    // Create core components
    this.camera = camera;
    this.scene = createScene();
    this.renderer = createRenderer();
    container.append(this.renderer.domElement);

    // Create systems
    new Resizer(this, container, minAspectRatio);
    this.pointer = new Pointer(this);
    this.loop = new Loop(this);

    if (RAPIER !== undefined) {
      if ("Vector2" in RAPIER) {
        this.physics = new Physics2D(this);
      } else if ("Vector3" in RAPIER) {
        this.physics = new Physics3D(this);
      }

      if (this.physics) {
        this.loop.tickables.push(this.physics);
      }
    }

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
        this.pointer.objectsToTest.push(object);
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
