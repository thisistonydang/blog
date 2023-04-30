import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import type { Camera } from "three";
import type { Loop } from "../systems/Loop";
import type { Patched } from "../types/Patched";

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
