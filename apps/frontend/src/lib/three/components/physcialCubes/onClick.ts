import { getPhysics3DBody } from "@lib/three/utils/instances/getPhysics3DBody";
import { instances } from "./instances";

import type { InstancedMesh } from "three";
import type { Patched } from "@lib/three/types/Patched";
import type { World } from "@lib/three/World";

export function onClick({
  world,
  instancedMesh,
}: {
  world: World;
  instancedMesh: InstancedMesh & Patched;
}): void {
  instancedMesh.onClick = ({ intersection }) => {
    const physicsBody = getPhysics3DBody(
      intersection,
      instances,
      instancedMesh
    );
    if (!physicsBody) return;

    physicsBody.rigidBody.applyImpulse({ x: 0.0, y: 1.0, z: 0.0 }, true);
    world.runWhileAwake();
  };
}
