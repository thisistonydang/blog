import { TrackballControls } from "three/examples/jsm/controls/TrackballControls.js";

import type { Camera } from "three";
import type { UpdatableTrackballControls } from "./Loop";

export function createTrackballControls(
  camera: Camera,
  canvas: HTMLCanvasElement
): UpdatableTrackballControls {
  const controls = new TrackballControls(
    camera,
    canvas
  ) as UpdatableTrackballControls;

  controls.tick = (): void => {
    controls.update();
  };

  return controls;
}
