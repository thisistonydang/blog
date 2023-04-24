import type { PerspectiveCamera, WebGLRenderer } from "three";

export class Resizer {
  constructor(
    container: HTMLDivElement,
    camera: PerspectiveCamera,
    renderer: WebGLRenderer
  ) {
    // Set the camera's aspect ratio.
    camera.aspect = container.clientWidth / container.clientHeight;

    // Update the camera's frustum.
    camera.updateProjectionMatrix();

    // Update the size of the renderer.
    renderer.setSize(container.clientWidth, container.clientHeight);

    // Set the pixel ratio. Note: pixel ratio may change when moving across
    // different monitors.
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }
}
