import { createBasicCube } from "./components/basic-cube";
import { createPerspectiveCamera } from "./components/perspective-camera";
import { createScene } from "./components/scene";

import { Resizer } from "./systems/Resizer";
import { createRenderer } from "./systems/renderer";

import type { PerspectiveCamera, Scene, WebGLRenderer } from "three";

let scene: Scene;
let camera: PerspectiveCamera;
let renderer: WebGLRenderer;

export class World {
  constructor(container: HTMLDivElement) {
    scene = createScene();
    camera = createPerspectiveCamera();
    renderer = createRenderer();
    container.append(renderer.domElement);

    const cube = createBasicCube();
    scene.add(cube);

    const resizer = new Resizer(container, camera, renderer);
  }

  render() {
    renderer.render(scene, camera);
  }
}
