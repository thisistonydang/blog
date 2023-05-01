import { getInstance } from "./get-instance";
import { instances } from "./instances";
import { updateInstanceMatrices } from "./update-instance-matrices";

import type { InstancedMesh } from "three";
import type { Patched } from "@lib/three/types/Patched";

export function addOnClickHandler(mesh: InstancedMesh & Patched): void {
  mesh.onClick = ({ intersection }) => {
    const instance = getInstance(intersection);
    if (!instance) return;

    if (!instance.scale || (instance.scale && instance.scale.x === 1)) {
      instance.scale = { x: 2, y: 2, z: 2 };
    } else {
      instance.scale = { x: 1, y: 1, z: 1 };
    }

    updateInstanceMatrices(mesh, instances);
  };
}
