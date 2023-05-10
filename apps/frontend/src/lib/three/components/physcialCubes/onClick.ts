import { getPhysics2DBody } from "@lib/three/utils/instances/getPhysics2DBody";
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
    const physicsBody = getPhysics2DBody(
      world,
      intersection,
      instances,
      instancedMesh
    );

    physicsBody?.rigidBody.applyImpulse({ x: 0.0, y: 1.0 }, true);
    world.runWhileAwake();
  };
}
