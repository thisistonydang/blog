import RAPIER from "@dimforge/rapier2d-compat";

import { addMesh } from "@lib/three/systems/Physics/2D/addMesh";
import { cuboidColliderDesc } from "@lib/three/systems/Physics/2D/cuboidColliderDesc";

import type { BoxGeometry, Mesh } from "three";
import type { Patched } from "@lib/three/types/Patched";

export function addPhysics2D({
  mesh,
}: {
  mesh: Mesh<BoxGeometry> & Patched;
}): void {
  mesh.addPhysics2D = (physics) => {
    addMesh({
      physics,
      mesh,
      rigidBodyDesc: RAPIER.RigidBodyDesc.dynamic(),
      colliderDesc: cuboidColliderDesc(mesh),
      activeEvents: RAPIER.ActiveEvents.COLLISION_EVENTS,
      restitution: 1,
    });
  };
}
