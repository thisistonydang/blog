import { createBasicCube } from "./components/basic-cube";
import { createPerspectiveCamera } from "./components/perspective-camera";
import { createScene } from "./components/scene";

import { Loop } from "./systems/Loop";
import { Resizer } from "./systems/Resizer";
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
    loop = new Loop(scene, camera, renderer);
    container.append(renderer.domElement);

    const controls = createTrackballControls(camera, renderer.domElement);
    const cube = createBasicCube();

    loop.updatables.push(controls, cube);
    scene.add(cube);

    new Resizer(container, camera, renderer);

    // Helpers
    scene.add(createAxesHelper(), createGridHelper());
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
