import RAPIER from "@dimforge/rapier3d-compat";

import type { ColliderDesc } from "@dimforge/rapier3d-compat";
import type { BoxGeometry, InstancedMesh, Mesh } from "three";

export function cuboidColliderDesc(
  mesh: Mesh<BoxGeometry> | InstancedMesh<BoxGeometry>,
  instanceScale?: { x: number; y: number; z: number }
): ColliderDesc {
  const parameters = mesh.geometry.parameters;
  const scale = mesh.scale;

  let hx = (parameters.width * scale.x) / 2;
  let hy = (parameters.height * scale.y) / 2;
  let hz = (parameters.depth * scale.z) / 2;

  if (instanceScale) {
    hx = hx * instanceScale.x;
    hy = hy * instanceScale.y;
    hz = hz * instanceScale.z;
  }

  const colliderDesc = RAPIER.ColliderDesc.cuboid(hx, hy, hz);

  return colliderDesc;
}
