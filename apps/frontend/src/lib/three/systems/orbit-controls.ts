import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import type { Camera } from "three";
import type { UpdatableOrbitControls } from "./Loop.types";

export function createOrbitControls(
  camera: Camera,
  canvas: HTMLCanvasElement
): UpdatableOrbitControls {
  const controls = new OrbitControls(camera, canvas) as UpdatableOrbitControls;
  controls.enableDamping = true;

  controls.tick = (): void => {
    controls.update();
  };

  return controls;
}
