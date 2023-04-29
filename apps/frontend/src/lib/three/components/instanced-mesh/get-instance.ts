import { instances } from "./instances";

import type { Intersection } from "three";
import type { Instance } from "./instances";

export const INSTANCE_IDS_KEY = "instance_ids";

/**
 * Get instance given intersection from raycaster.
 */
export function getInstance(e: Intersection): Instance | undefined {
  if (e.instanceId === undefined) {
    return undefined;
  }

  const id = e.object.userData[INSTANCE_IDS_KEY][e.instanceId];
  return instances.find((instance) => instance.id === id);
}
