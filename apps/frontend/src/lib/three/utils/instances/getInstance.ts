import type { Intersection } from "three";
import type { Instance } from "@lib/three/types/Instance";

/**
 * Get instance from raycaster intersection.
 */
export function getInstance(
  intersection: Intersection,
  instances: Instance[],
  instanceIdsKey: string
): Instance | undefined {
  if (intersection.instanceId === undefined) {
    return undefined;
  }

  const instanceIds: string[] = intersection.object.userData[instanceIdsKey];
  const id = instanceIds[intersection.instanceId];
  const instance = instances.find((instance) => instance.id === id);

  return instance;
}
