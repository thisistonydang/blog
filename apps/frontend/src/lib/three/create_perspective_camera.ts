import { PerspectiveCamera } from "three";

/**
 * Create perspective camera and move camera out.
 */
export function create_perspective_camera(
  container: HTMLDivElement
): PerspectiveCamera {
  const camera = new PerspectiveCamera(
    50,
    container.offsetWidth / container.offsetHeight,
    0.1,
    2000
  );
  camera.position.set(0, 0, 5);

  return camera;
}
