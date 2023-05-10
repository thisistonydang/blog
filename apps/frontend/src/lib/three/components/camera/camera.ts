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

export function camera(world: World) {
  const camera = world.camera;
  if (!(camera instanceof PerspectiveCamera)) {
    throw Error("Camera is not a PerspectiveCamera.");
  }

  const c: Controls = {
    fov: camera.fov,
    near: camera.near,
    far: camera.far,
    positionX: camera.position.x,
    positionY: camera.position.y,
    positionZ: camera.position.z,
  };

  // Add tweaks
  updateGui({ c, camera });

  return camera;
}
