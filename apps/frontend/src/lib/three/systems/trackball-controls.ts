import { TrackballControls } from "three/examples/jsm/controls/TrackballControls.js";

import type { Camera } from "three";
import type { Patched } from "../types/Patched";
import type { Loop } from "./Loop";

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
