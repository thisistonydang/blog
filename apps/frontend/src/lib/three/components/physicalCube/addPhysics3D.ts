import RAPIER from "@dimforge/rapier3d-compat";

import { addMesh } from "@lib/three/systems/Physics/3D/addMesh";
import { cuboidColliderDesc } from "@lib/three/systems/Physics/3D/cuboidColliderDesc";

import type { BoxGeometry, Mesh } from "three";
import type { Patched } from "../../types/Patched";

export function addPhysics3D({
  mesh,
}: {
  mesh: Mesh<BoxGeometry> & Patched;
}): void {
  mesh.addPhysics3D = (physics) => {
    addMesh({
      physics,
      mesh,
      rigidBodyDesc: RAPIER.RigidBodyDesc.dynamic(),
      colliderDesc: cuboidColliderDesc(mesh),
      restitution: 1,
    });
  };
}
