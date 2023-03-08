import { Camera, Clock, Scene, WebGLRenderer } from "three";
import { create_perspective_camera } from "./create_perspective_camera";
import { create_renderer } from "./create_renderer";
import { add_resize_listener } from "./add_resize_listener";

/**
 * Setup scene, canvas, and renderer given id of a parent div.
 */
export function setup_three(id: string): {
  scene: Scene;
  camera: Camera;
  renderer: WebGLRenderer;
  clock: Clock;
} {
  // Get parent container div by id.
  const container = document.getElementById(id) as HTMLDivElement;

  // Create scene.
  const scene = new Scene();

  // Add camera
  const camera = create_perspective_camera(container);
  scene.add(camera);

  // Create renderer.
  const renderer = create_renderer(container);
  container.appendChild(renderer.domElement);

  // Create clock.
  const clock = new Clock();

  // Add resize listener.
  add_resize_listener(container, camera, renderer);

  return { scene, camera, renderer, clock };
}
