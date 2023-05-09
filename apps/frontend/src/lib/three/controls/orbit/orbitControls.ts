import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import type { Patched } from "../../types/Patched";
import type { World } from "../../World";

interface Controls {
  enableDamping: boolean;
}

export function orbitControls({
  camera,
  renderer,
  loop,
}: World): OrbitControls & Patched {
  const c: Controls = {
    enableDamping: true,
  };

  // Create controls.
  const controls: OrbitControls & Patched = new OrbitControls(
    camera,
    renderer.domElement
  );
  controls.enableDamping = c.enableDamping;

  // Update controls each tick to allow damping.
  controls.tickOnRenderRequest = () => controls.update();
  controls.tickOnWorldStart = () => controls.update();

  // When rendering on demand, request a render on change events if a render has
  // not already been requested.
  controls.addEventListener("change", loop.requestRender);

  controls.updateGui = ({ createFolder }) => {
    const folder = createFolder("orbit controls");
    folder.add(c, "enableDamping").onChange((enableDamping: boolean) => {
      controls.enableDamping = enableDamping;
    });
  };

  return controls;
}
