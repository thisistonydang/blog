import { PerspectiveCamera } from "three";

export function perspectiveCamera({
  fov = 50,
  near = 0.1,
  far = 2000,
  position = [0, 0, 10],
}: {
  fov?: number;
  near?: number;
  far?: number;
  position?: [number, number, number];
}) {
  // Create camera
  const camera = new PerspectiveCamera(fov, 1, near, far);
  camera.position.set(position[0], position[1], position[2]);

  return camera;
}
