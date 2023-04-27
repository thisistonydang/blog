import GUI from "lil-gui";
import { isPatched } from "../types/Patched";

import type { Object3D } from "three";

export class Gui {
  gui: GUI | null = null;
  tweakables: Object3D[] = [];

  constructor(showGui = false) {
    if (showGui) {
      this.gui = new GUI();
    }
  }

  init(): void {
    this.tweakables.forEach((object) => {
      if (!this.gui) return;

      if (isPatched(object) && "updateGui" in object) {
        object.updateGui(this.gui);
      }
    });
  }
}
