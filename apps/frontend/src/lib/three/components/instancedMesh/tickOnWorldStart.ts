import { MathUtils } from "three";

import { updateInstanceMatrices } from "@lib/three/utils/instances/updateInstanceMatrices";
import { instances } from "./instances";

import type { InstancedMesh } from "three";
import type { Patched } from "@lib/three/types/Patched";

export function tickOnWorldStart({
  instancedMesh,
}: {
  instancedMesh: InstancedMesh & Patched;
}): void {
  instancedMesh.tickOnWorldStart = ({ delta }) => {
    const radiansPerSecond = MathUtils.degToRad(15);

    instances.forEach((instance) => {
      instance.rotation.x += radiansPerSecond * delta;
      instance.rotation.y += radiansPerSecond * delta;
      instance.rotation.z += radiansPerSecond * delta;
    });

    updateInstanceMatrices(instancedMesh, instances);
  };
}
