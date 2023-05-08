import { MathUtils } from "three";

import { instances } from "./instances";
import { updateInstanceMatrices } from "./updateInstanceMatrices";

import type { InstancedMesh } from "three";
import type { Patched } from "@lib/three/types/Patched";

export function tickOnWorldStart({
  mesh,
}: {
  mesh: InstancedMesh & Patched;
}): void {
  mesh.tickOnWorldStart = ({ delta }) => {
    const radiansPerSecond = MathUtils.degToRad(15);

    instances.forEach((instance) => {
      instance.rotation.x += radiansPerSecond * delta;
      instance.rotation.y += radiansPerSecond * delta;
      instance.rotation.z += radiansPerSecond * delta;
    });

    updateInstanceMatrices(mesh, instances);
  };
}
