import GUI from "lil-gui";
import { isPatched } from "../types/Patched";

import type { Object3D } from "three";

/**
 * Create GUI and update it with tweaks from each tweakable object.
 */
export function createGui(tweakableObjects: Object3D[]): void {
  const gui = new GUI();

  tweakableObjects.forEach((object) => {
    if (isPatched(object) && "updateGui" in object) {
      object.updateGui(gui);
    }
  });
}
