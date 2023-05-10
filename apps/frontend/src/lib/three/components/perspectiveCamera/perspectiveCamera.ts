import { PerspectiveCamera } from "three";
import { updateGui } from "./updateGui";

import type { World } from "@lib/three/World";

export interface Controls {
  fov: number;
  near: number;
  far: number;
  positionX: number;
  positionY: number;
  positionZ: number;
}

export function perspectiveCamera(
  world: World,
  {
    fov = 50,
    near = 0.1,
    far = 2000,
    position = [0, 0, 10],
  }: {
    fov?: number;
    near?: number;
    far?: number;
    position?: [number, number, number];
  }
) {
  const c: Controls = {
    fov,
    near,
    far,
    positionX: position[0],
    positionY: position[1],
    positionZ: position[2],
  };

  const camera = world.camera;
  if (!(camera instanceof PerspectiveCamera)) {
    throw Error("Camera is not a PerspectiveCamera.");
  }

  camera.fov = c.fov;
  camera.near = c.near;
  camera.far = c.far;
  camera.position.set(c.positionX, c.positionY, c.positionZ);

  // Add tweaks
  updateGui({ c, camera });

  return camera;
}
