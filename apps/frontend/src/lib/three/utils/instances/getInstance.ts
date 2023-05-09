import type { Intersection } from "three";
import type { Instance } from "@lib/three/types/Instance";

import { INSTANCE_IDS_KEY } from "./setInstanceIds";

/**
 * Get instance from raycaster intersection.
 */
export function getInstance(
  intersection: Intersection,
  instances: Instance[]
): Instance | undefined {
  if (intersection.instanceId === undefined) {
    return undefined;
  }

  const instanceIds: string[] = intersection.object.userData[INSTANCE_IDS_KEY];
  const id = instanceIds[intersection.instanceId];
  const instance = instances.find((instance) => instance.id === id);

  return instance;
}
