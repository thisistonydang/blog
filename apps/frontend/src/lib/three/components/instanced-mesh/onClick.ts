import { getInstance } from "./getInstance";
import { instances } from "./instances";
import { updateInstanceMatrices } from "./updateInstanceMatrices";

import type { InstancedMesh } from "three";
import type { Patched } from "@lib/three/types/Patched";

export function onClick({ mesh }: { mesh: InstancedMesh & Patched }): void {
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
