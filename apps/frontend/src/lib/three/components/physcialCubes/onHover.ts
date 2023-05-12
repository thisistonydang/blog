import type { InstancedMesh } from "three";
import type { Patched } from "@lib/three/types/Patched";

export function onHover({
  instancedMesh,
}: {
  instancedMesh: InstancedMesh & Patched;
}): void {
  instancedMesh.onPointerEnter = () => {
    document.body.style.cursor = "pointer";
  };

  instancedMesh.onPointerLeave = () => {
    document.body.style.cursor = "default";
  };
}
