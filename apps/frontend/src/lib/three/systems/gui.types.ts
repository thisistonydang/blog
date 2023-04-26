import type GUI from "lil-gui";
import type { Mesh } from "three";

type UpdateGUI = (gui: GUI) => void;

export interface TweakableMesh extends Mesh {
  updateGui?: UpdateGUI;
}

export type TweakableObject = TweakableMesh;
