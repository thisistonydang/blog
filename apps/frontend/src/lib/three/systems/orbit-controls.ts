import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import type { Camera } from "three";
import type { Patched } from "../types/Patched";
import type { Loop } from "./Loop";

export function createOrbitControls(
  camera: Camera,
  canvas: HTMLCanvasElement,
  loop: Loop
): OrbitControls & Patched {
  const controls: OrbitControls & Patched = new OrbitControls(camera, canvas);
  controls.enableDamping = true;

  controls.tick = (): void => {
    controls.update();
  };

  loop.tickables.push(controls);

  return controls;
}
