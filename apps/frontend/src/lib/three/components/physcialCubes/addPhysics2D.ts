import RAPIER from "@dimforge/rapier2d-compat";

import { addInstancedMesh } from "@lib/three/systems/Physics/2D/addInstancedMesh";
import { cuboidColliderDesc } from "@lib/three/systems/Physics/2D/cuboidColliderDesc";
import { instances } from "./instances";

import type { BoxGeometry, InstancedMesh } from "three";
import type { Patched } from "@lib/three/types/Patched";
import type { PhysicsInstance } from "@lib/three/types/Rapier2D";

export function addPhysics2D({
  instancedMesh,
}: {
  instancedMesh: InstancedMesh<BoxGeometry> & Patched;
}): void {
  // Add physics description to each instance
  const physicsInstances: PhysicsInstance[] = instances.map((instance) => {
    return {
      ...instance,
      rigidBodyDesc: RAPIER.RigidBodyDesc.dynamic(),
      colliderDesc: cuboidColliderDesc(instancedMesh, instance.scale),
      restitution: 1,
    };
  });

  instancedMesh.addPhysics2D = (physics) => {
    addInstancedMesh({ physics, instancedMesh, physicsInstances });
  };
}
