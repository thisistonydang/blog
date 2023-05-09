import RAPIER from "@dimforge/rapier2d-compat";

import type { ColliderDesc } from "@dimforge/rapier2d-compat";
import type { BoxGeometry, InstancedMesh, Mesh } from "three";

export function cuboidColliderDesc(
  mesh: Mesh<BoxGeometry> | InstancedMesh<BoxGeometry>,
  instanceScale?: { x: number; y: number; z: number }
): ColliderDesc {
  const parameters = mesh.geometry.parameters;
  const scale = mesh.scale;

  let hx = (parameters.width * scale.x) / 2;
  let hy = (parameters.height * scale.y) / 2;

  if (instanceScale) {
    hx = hx * instanceScale.x;
    hy = hy * instanceScale.y;
  }

  const colliderDesc = RAPIER.ColliderDesc.cuboid(hx, hy);

  return colliderDesc;
}
