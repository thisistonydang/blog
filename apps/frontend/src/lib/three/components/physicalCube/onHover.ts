import type { Mesh } from "three";
import type { Patched } from "@lib/three/types/Patched";

export function onHover({
  mesh,
}: {
  mesh: Mesh & Patched;
}): void {
  mesh.onPointerEnter = () => {
    document.body.style.cursor = "pointer";
  };

  mesh.onPointerLeave = () => {
    document.body.style.cursor = "default";
  };
}
