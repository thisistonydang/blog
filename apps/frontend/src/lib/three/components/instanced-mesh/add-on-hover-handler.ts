import { getInstance } from "./get-instance";
import { instances } from "./instances";
import { updateInstanceColors } from "./update-instance-colors";

import type { InstancedMesh } from "three";
import type { Patched } from "@lib/three/types/Patched";

export function addOnHoverHandler(mesh: InstancedMesh & Patched): void {
  mesh.onPointerEnter = (e) => {
    document.body.style.cursor = "pointer";
    const instance = getInstance(e);
    if (!instance) return;

    instance.color = 0xff00ff;
    updateInstanceColors(mesh, instances);
  };

  mesh.onPointerLeave = (e) => {
    document.body.style.cursor = "default";
    const instance = getInstance(e);
    if (!instance) return;

    instance.color = 0x00ffff;
    updateInstanceColors(mesh, instances);
  };
}
