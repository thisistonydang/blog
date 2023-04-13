/**
 * Shared Geometries
 *
 * Used for board panels and foot chip.
 */

import { BoxGeometry } from "three";

export const BOX_GEOMETRY_SCALE = 12;
export const boxGeometry = new BoxGeometry(
  1 / BOX_GEOMETRY_SCALE,
  1 / BOX_GEOMETRY_SCALE,
  1 / BOX_GEOMETRY_SCALE
);
