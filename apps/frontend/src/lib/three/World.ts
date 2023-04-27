import { createBasicCube } from "./components/basic-cube";
import { createPerspectiveCamera } from "./components/perspective-camera";
import { createScene } from "./components/scene";

import { EventsListener } from "./systems/EventsListener";
import { Loop } from "./systems/Loop";
import { Resizer } from "./systems/Resizer";
import { createGui } from "./systems/gui";
import { createRenderer } from "./systems/renderer";
import { createTrackballControls } from "./systems/trackball-controls";

import { createAxesHelper } from "./helpers/axes-helper";
import { createGridHelper } from "./helpers/grid-helper";

import type { PerspectiveCamera, Scene, WebGLRenderer } from "three";

let scene: Scene;
let camera: PerspectiveCamera;
let renderer: WebGLRenderer;
let loop: Loop;

export class World {
  constructor(container: HTMLDivElement) {
    scene = createScene();
    camera = createPerspectiveCamera();
    renderer = createRenderer();
    container.append(renderer.domElement);
    new Resizer(container, camera, renderer);

    const controls = createTrackballControls(camera, renderer.domElement);
    const cube = createBasicCube();

    scene.add(cube);
    new EventsListener(renderer.domElement, camera, [cube]);
    loop = new Loop(scene, camera, renderer, [controls, cube], true);

    // Dev
    scene.add(createAxesHelper(), createGridHelper());
    createGui([cube]);
  }

  render() {
    renderer.render(scene, camera);
  }

  start() {
    loop.start();
  }

  stop() {
    loop.stop();
  }
}
