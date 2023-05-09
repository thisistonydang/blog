import { addInstancedMesh } from "@lib/three/systems/Physics/3D/addInstancedMesh";
import { cuboidColliderDesc } from "@lib/three/systems/Physics/3D/cuboidColliderDesc";
import { instances } from "./instances";

import type { BoxGeometry, InstancedMesh } from "three";
import type { Patched } from "@lib/three/types/Patched";

export function addPhysics3D({
  instancedMesh,
}: {
  instancedMesh: InstancedMesh<BoxGeometry> & Patched;
}): void {
  // Add a collider description to each instance
  instances.forEach((instance) => {
    instance.colliderDesc = cuboidColliderDesc(instancedMesh, instance.scale);
  });

  instancedMesh.addPhysics3D = (physics) => {
    addInstancedMesh({ physics, instancedMesh, instances });
  };
}
