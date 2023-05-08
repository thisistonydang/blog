import { Color } from "three";

import type { InstancedMesh } from "three";
import type { Instance } from "./instances";

const color = new Color();

export function updateInstanceColors(
  mesh: InstancedMesh,
  instances: Instance[]
): void {
  instances.forEach((instance, index) => {
    mesh.setColorAt(index, color.set(instance.color));
  });

  if (mesh.instanceColor) {
    mesh.instanceColor.needsUpdate = true;
  }
}
