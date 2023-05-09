import { getInstance } from "@lib/three/utils/instances/getInstance";
import { updateInstanceMatrices } from "@lib/three/utils/instances/updateInstanceMatrices";

import { instances } from "./instances";

import type { InstancedMesh } from "three";
import type { Patched } from "@lib/three/types/Patched";

export function onClick({
  instancedMesh,
}: {
  instancedMesh: InstancedMesh & Patched;
}): void {
  instancedMesh.onClick = ({ intersection }) => {
    const instance = getInstance(intersection, instances);
    if (!instance) return;

    if (instance.scale.x === 1) {
      instance.scale = { x: 2, y: 2, z: 2 };
    } else {
      instance.scale = { x: 1, y: 1, z: 1 };
    }

    updateInstanceMatrices(instancedMesh, instances);
  };
}
