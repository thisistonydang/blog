import { addMesh } from "@lib/three/systems/Physics/3D/addMesh";
import { cuboidColliderDesc } from "@lib/three/systems/Physics/3D/cuboidColliderDesc";

import type { BoxGeometry, Mesh } from "three";
import type { Patched } from "@lib/three/types/Patched";

export function addPhysics3D({
  mesh,
}: {
  mesh: Mesh<BoxGeometry> & Patched;
}): void {
  mesh.addPhysics3D = ({ RAPIER, physicsWorld }) => {
    addMesh({
      physicsWorld,
      mesh,
      rigidBodyDesc: RAPIER.RigidBodyDesc.fixed(),
      colliderDesc: cuboidColliderDesc(RAPIER, mesh),
    });
  };
}
