import RAPIER from "@dimforge/rapier3d-compat";

import { addInstancedMesh } from "@lib/three/systems/Physics/3D/addInstancedMesh";
import { cuboidColliderDesc } from "@lib/three/systems/Physics/3D/cuboidColliderDesc";
import { instances } from "./instances";

import type { BoxGeometry, InstancedMesh } from "three";
import type { Patched } from "@lib/three/types/Patched";
import type { PhysicsInstance } from "@lib/three/types/Rapier3D";

export function addPhysics3D({
  instancedMesh,
}: {
  instancedMesh: InstancedMesh<BoxGeometry> & Patched;
}) {
  // Add physics description to each instance
  const physicsInstances: PhysicsInstance[] = instances.map((instance) => {
    return {
      ...instance,
      rigidBodyDesc: RAPIER.RigidBodyDesc.dynamic(),
      colliderDesc: cuboidColliderDesc(instancedMesh, instance.scale),
      activeEvents: RAPIER.ActiveEvents.COLLISION_EVENTS,
      restitution: 1,
    };
  });

  instancedMesh.addPhysics3D = (physics) => {
    addInstancedMesh({ physics, instancedMesh, physicsInstances });
  };
}
