import { MathUtils } from "three";

import { instances } from "./instances";
import { updateInstanceMatrices } from "./update-instance-matrices";

import type { InstancedMesh } from "three";
import type { Patched } from "@lib/three/types/Patched";

export function addTick(mesh: InstancedMesh & Patched): void {
  mesh.tick = ({ delta, frameloop }) => {
    if (frameloop === "always") {
      instances.forEach((instance) => {
        if (instance.rotation === undefined) {
          instance.rotation = 0;
        } else {
          instance.rotation += MathUtils.degToRad(15) * delta;
        }
      });

      updateInstanceMatrices(mesh, instances);
    }
  };
}
