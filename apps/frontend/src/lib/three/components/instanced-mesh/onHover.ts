import { getInstance } from "./getInstance";
import { instances } from "./instances";
import { updateInstanceColors } from "./updateInstanceColors";

import type { InstancedMesh } from "three";
import type { Patched } from "@lib/three/types/Patched";

export function onHover({ mesh }: { mesh: InstancedMesh & Patched }): void {
  mesh.onPointerEnter = ({ intersection }) => {
    document.body.style.cursor = "pointer";
    const instance = getInstance(intersection);
    if (!instance) return;

    instance.color = 0xff00ff;
    updateInstanceColors(mesh, instances);
  };

  mesh.onPointerLeave = ({ intersection }) => {
    document.body.style.cursor = "default";
    const instance = getInstance(intersection);
    if (!instance) return;

    instance.color = 0x00ffff;
    updateInstanceColors(mesh, instances);
  };
}
