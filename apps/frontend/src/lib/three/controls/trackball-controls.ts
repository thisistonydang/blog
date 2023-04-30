import { TrackballControls } from "three/examples/jsm/controls/TrackballControls.js";

import type { Camera } from "three";
import type { Loop } from "../systems/Loop";
import type { Patched } from "../types/Patched";

export function createTrackballControls(
  camera: Camera,
  canvas: HTMLCanvasElement,
  loop: Loop
): TrackballControls & Patched {
  const controls: TrackballControls & Patched = new TrackballControls(
    camera,
    canvas
  );

  controls.tick = (): void => {
    controls.update();
  };

  loop.tickables.push(controls);

  return controls;
}
