import type { ColliderDesc } from "@dimforge/rapier3d-compat";
import type { BoxGeometry, InstancedMesh, Mesh } from "three";

import type { PhysicsInstance, Rapier3D } from "@lib/three/types/Rapier3D";

export function hasCuboidGeometry(
  mesh: Mesh | InstancedMesh
): mesh is Mesh<BoxGeometry> | InstancedMesh<BoxGeometry> {
  return mesh.geometry.type === "BoxGeometry";
}

export function cuboidColliderDesc(
  RAPIER: Rapier3D,
  mesh: Mesh<BoxGeometry> | InstancedMesh<BoxGeometry>,
  instance?: PhysicsInstance
): ColliderDesc {
  const parameters = mesh.geometry.parameters;
  const scale = mesh.scale;

  let hx = (parameters.width * scale.x) / 2;
  let hy = (parameters.height * scale.y) / 2;
  let hz = (parameters.depth * scale.z) / 2;

  if (instance) {
    hx = hx * instance.scale.x;
    hy = hy * instance.scale.y;
    hz = hz * instance.scale.z;
  }

  const colliderDesc = RAPIER.ColliderDesc.cuboid(hx, hy, hz);

  return colliderDesc;
}
