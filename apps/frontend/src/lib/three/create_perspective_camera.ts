import { PerspectiveCamera } from "three";

/**
 * Create perspective camera and move camera out.
 */
export function create_perspective_camera(sizes: {
  width: number;
  height: number;
}): PerspectiveCamera {
  const camera = new PerspectiveCamera(
    50,
    sizes.width / sizes.height,
    0.1,
    2000
  );
  camera.position.set(0, 0, 3);

  return camera;
}
