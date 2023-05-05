import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import type { Patched } from "../types/Patched";
import type { World } from "../World";

export function createOrbitControls({
  camera,
  renderer,
  loop,
}: World): OrbitControls & Patched {
  // Create controls
  const controls: OrbitControls & Patched = new OrbitControls(
    camera,
    renderer.domElement
  );
  controls.enableDamping = true;

  // Update controls each tick to allow damping
  controls.tick = () => {
    controls.update();
  };
  loop.tickables.push(controls);

  // When rendering on demand, request a render on change events if a render has
  // not already been requested.
  controls.addEventListener("change", () => {
    if (loop.frameloop === "demand") {
      loop.requestRender();
    }
  });

  return controls;
}
