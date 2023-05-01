import { instances } from "./instances";

import type { Intersection } from "three";
import type { Instance } from "./instances";

export const INSTANCE_IDS_KEY = "instance_ids";

/**
 * Get instance given intersection from raycaster.
 */
export function getInstance(intersection: Intersection): Instance | undefined {
  if (intersection.instanceId === undefined) {
    return undefined;
  }

  const id =
    intersection.object.userData[INSTANCE_IDS_KEY][intersection.instanceId];
  return instances.find((instance) => instance.id === id);
}
