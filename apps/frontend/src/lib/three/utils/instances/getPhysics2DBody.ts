import { getInstance } from "./getInstance";

import type { InstancedMesh, Intersection } from "three";

import type { Physics2D } from "@lib/three/systems/Physics/Physics2D";
import type { Instance } from "@lib/three/types/Instance";
import type { PhysicsBody } from "@lib/three/types/Rapier2D";
import type { World } from "@lib/three/World";

/**
 * Get physics body from raycaster intersection.
 */
export function getPhysics2DBody(
  { physics }: World,
  intersection: Intersection,
  instances: Instance[],
  instancedMesh: InstancedMesh
): PhysicsBody | undefined {
  const instance = getInstance(intersection, instances);
  if (!instance) {
    return undefined;
  }

  const physicsBodies = (physics as Physics2D).instanceMeshMap.get(
    instancedMesh
  );
  const physicsBody = physicsBodies?.find(({ id }) => id === instance.id);

  return physicsBody;
}
