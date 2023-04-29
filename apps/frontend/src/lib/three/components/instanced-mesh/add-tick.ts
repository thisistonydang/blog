import { MathUtils } from "three";

import { instances } from "./instances";
import { updateInstanceMatrices } from "./update-instance-matrices";

import type { InstancedMesh } from "three";
import type { Patched } from "@lib/three/types/Patched";

export function addTick(mesh: InstancedMesh & Patched): void {
  mesh.tick = (delta) => {
    instances.forEach(({ rotation }) => {
      if (rotation !== undefined) {
        rotation += MathUtils.degToRad(15) * delta;
      } else {
        rotation = 0;
      }
    });

    updateInstanceMatrices(mesh, instances);
  };
}
