import GUI from "lil-gui";
import type { Mesh } from "three";

export interface TweakableMesh extends Mesh {
  updateGui: (gui: GUI) => void;
}

export function createGui(tweakables: TweakableMesh[]): void {
  const gui = new GUI();

  for (const object of tweakables) {
    object.updateGui(gui);
  }
}
