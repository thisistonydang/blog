import { PerspectiveCamera } from "three";

/**
 * Create perspective camera and move camera out.
 */
export function createPerspectiveCamera(): PerspectiveCamera {
  const camera = new PerspectiveCamera(
    50, // fov = Field Of View
    1, // aspect ratio (dummy value)
    0.1, // near clipping plane
    2000 // far clipping plane
  );

  // Move the camera back so we can view the scene
  camera.position.set(0, 0, 10);

  return camera;
}
