import type { Mesh, MeshMatcapMaterial } from "three";
import type { Patched } from "../../types/Patched";
import type { Controls } from "./physicalCube";

export function onHover({
  c,
  material,
  mesh,
}: {
  c: Controls;
  material: MeshMatcapMaterial;
  mesh: Mesh & Patched;
}): void {
  mesh.onPointerEnter = () => {
    material.color.set(0xff0000);
    document.body.style.cursor = "pointer";
  };

  mesh.onPointerLeave = () => {
    document.body.style.cursor = "default";
    material.color.set(c.color);
  };
}
