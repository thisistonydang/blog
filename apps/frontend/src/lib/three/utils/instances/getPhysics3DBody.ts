import { getInstance } from "./getInstance";

import type { InstancedMesh, Intersection } from "three";
import type { Instance } from "../../types/Instance";
import type { PhysicsBody } from "../../types/Rapier3D";

/**
 * Get physics body from raycaster intersection.
 */
export function getPhysics3DBody(
  intersection: Intersection,
  instances: Instance[],
  instancedMesh: InstancedMesh
): PhysicsBody | undefined {
  const instance = getInstance(intersection, instances);
  if (!instance) {
    return undefined;
  }

  const physicsBodies: PhysicsBody[] = instancedMesh.userData.physicsBodies;
  const physicsBody = physicsBodies.find(({ id }) => id === instance.id);

  return physicsBody;
}
