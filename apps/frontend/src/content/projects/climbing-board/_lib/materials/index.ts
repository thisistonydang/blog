/** Shared Materials **/

import { Color, MeshStandardMaterial } from "three";

export const boardMaterial = new MeshStandardMaterial({
  color: new Color("#000000").convertSRGBToLinear(),
  transparent: true,
  opacity: 0.9,
  metalness: 0.5,
});
