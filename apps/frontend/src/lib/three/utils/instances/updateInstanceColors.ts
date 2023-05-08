import { Color } from "three";

import type { InstancedMesh } from "three";
import type { Instance } from "../../types/Instance";

const color = new Color();

export function updateInstanceColors(
  instanceMesh: InstancedMesh,
  instances: Instance[]
): void {
  instances.forEach((instance, index) => {
    instanceMesh.setColorAt(index, color.set(instance.color));
  });

  if (instanceMesh.instanceColor) {
    instanceMesh.instanceColor.needsUpdate = true;
  }
}
