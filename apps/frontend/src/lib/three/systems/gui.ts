import GUI from "lil-gui";
import type { TweakableObject } from "./gui.types";

/**
 * Create GUI and update it with tweaks from each tweakable object.
 */
export function createGui(tweakables: TweakableObject[]): void {
  const gui = new GUI();

  tweakables.forEach((tweakableObject) => {
    if ("updateGui" in tweakableObject) {
      tweakableObject.updateGui(gui);
    }
  });
}
