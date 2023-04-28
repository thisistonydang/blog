import GUI from "lil-gui";
import { isPatched } from "../types/Patched";

import type { Object3D } from "three";

export class Gui {
  gui = new GUI();
  tweakables: Object3D[] = [];

  init(): void {
    this.tweakables.forEach((object) => {
      if (isPatched(object) && "updateGui" in object) {
        object.updateGui(this.gui);
      }
    });
  }
}
