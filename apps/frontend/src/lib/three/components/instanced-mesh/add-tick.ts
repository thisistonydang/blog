import { MathUtils } from "three";

import { instances } from "./instances";
import { updateInstanceMatrices } from "./update-instance-matrices";

import type { InstancedMesh } from "three";
import type { Patched } from "@lib/three/types/Patched";

export function addTick(mesh: InstancedMesh & Patched): void {
  mesh.tick = (delta) => {
    instances.forEach((instance) => {
      if (instance.rotation !== undefined) {
        instance.rotation += MathUtils.degToRad(15) * delta;
      } else {
        instance.rotation = 0;
      }
    });

    updateInstanceMatrices(mesh, instances);
  };
}
