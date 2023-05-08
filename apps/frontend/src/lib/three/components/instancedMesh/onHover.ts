import { updateInstanceColors } from "@lib/three/utils/instances/updateInstanceColors";
import { getInstance } from "./getInstance";
import { instances } from "./instances";

import type { InstancedMesh } from "three";
import type { Patched } from "@lib/three/types/Patched";

export function onHover({
  instancedMesh,
}: {
  instancedMesh: InstancedMesh & Patched;
}): void {
  instancedMesh.onPointerEnter = ({ intersection }) => {
    document.body.style.cursor = "pointer";
    const instance = getInstance(intersection);
    if (!instance) return;

    instance.color = 0xff00ff;
    updateInstanceColors(instancedMesh, instances);
  };

  instancedMesh.onPointerLeave = ({ intersection }) => {
    document.body.style.cursor = "default";
    const instance = getInstance(intersection);
    if (!instance) return;

    instance.color = 0x00ffff;
    updateInstanceColors(instancedMesh, instances);
  };
}
