import { TrackballControls } from "three/examples/jsm/controls/TrackballControls.js";

import type { Patched } from "../types/Patched";
import type { World } from "../World";

export function createTrackballControls({
  camera,
  renderer,
}: World): TrackballControls & Patched {
  // Create controls
  const controls: TrackballControls & Patched = new TrackballControls(
    camera,
    renderer.domElement
  );

  // Update controls each tick
  controls.tick = () => {
    controls.update();
  };

  return controls;
}
