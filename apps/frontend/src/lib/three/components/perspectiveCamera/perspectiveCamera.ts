import { PerspectiveCamera } from "three";
import { updateGui } from "./updateGui";

export interface Controls {
  fov: number;
  near: number;
  far: number;
  positionX: number;
  positionY: number;
  positionZ: number;
}

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
}): PerspectiveCamera {
  const c: Controls = {
    fov,
    near,
    far,
    positionX: position[0],
    positionY: position[1],
    positionZ: position[2],
  };

  const camera = new PerspectiveCamera(
    c.fov,
    1, // Dummy value for aspect ratio. Will be set in Resizer.
    c.near,
    c.far
  );
  camera.position.set(c.positionX, c.positionY, c.positionZ);

  // Add tweaks
  updateGui({ c, camera });

  return camera;
}
