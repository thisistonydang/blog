import { createCube } from "./components/cube";
import { createPerspectiveCamera } from "./components/perspective-camera";
import { createScene } from "./components/scene";

import { EventsListener } from "./systems/EventsListener";
import { Gui } from "./systems/Gui";
import { Loop } from "./systems/Loop";
import { Resizer } from "./systems/Resizer";
import { createRenderer } from "./systems/renderer";
import { createTrackballControls } from "./systems/trackball-controls";

import { createAxesHelper } from "./helpers/axes-helper";
import { createGridHelper } from "./helpers/grid-helper";

import type { Object3D, PerspectiveCamera, Scene, WebGLRenderer } from "three";

let scene: Scene;
let camera: PerspectiveCamera;
let renderer: WebGLRenderer;
let eventsListener: EventsListener;
let loop: Loop;
let gui: Gui;

export class World {
  constructor(container: HTMLDivElement) {
    scene = createScene();
    camera = createPerspectiveCamera();
    renderer = createRenderer();
    container.append(renderer.domElement);
    new Resizer(container, camera, renderer);
    eventsListener = new EventsListener(renderer.domElement, camera);
    loop = new Loop(scene, camera, renderer, true);
    gui = new Gui(true);
    createTrackballControls(camera, renderer.domElement, loop);

    const cube = createCube();

    this.add([createAxesHelper(), createGridHelper(), cube]);
    gui.init();
  }

  add(objects: Object3D[]): void {
    for (const object of objects) {
      scene.add(object);
      if (
        "onClick" in object ||
        "onPointerEnter" in object ||
        "onPointerLeave" in object
      ) {
        eventsListener.objectsToTest.push(object);
      }
      if ("tick" in object) {
        loop.tickables.push(object);
      }
      if ("updateGui" in object) {
        gui.tweakables.push(object);
      }
    }
  }

  render(): void {
    renderer.render(scene, camera);
  }

  start(): void {
    loop.start();
  }

  stop(): void {
    loop.stop();
  }
}
