import type { InstancedMesh } from "three";
import type { Instance } from "@lib/three/types/Instance";

export const INSTANCE_IDS_KEY = "instance_ids";

export function setInstanceIds(
  instancedMesh: InstancedMesh,
  instances: Instance[]
): void {
  instancedMesh.userData[INSTANCE_IDS_KEY] = instances.map(({ id }) => id);
}
