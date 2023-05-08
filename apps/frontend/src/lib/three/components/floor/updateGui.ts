import type { Mesh, MeshMatcapMaterial } from "three";
import type { Patched } from "@lib/three/types/Patched";
import type { Controls } from "./floor";

export function updateGui({
  c,
  material,
  mesh,
}: {
  c: Controls;
  material: MeshMatcapMaterial;
  mesh: Mesh & Patched;
}): void {
  mesh.updateGui = ({ createFolder }) => {
    const folder = createFolder("floor");

    // Color
    folder.addColor(c, "color").onChange((v: string) => material.color.set(v));

    // Position
    folder
      .add(c, "positionX", -10, 10, 0.1)
      .onChange((v: number) => (mesh.position.x = v));
    folder
      .add(c, "positionY", -10, 10, 0.1)
      .onChange((v: number) => (mesh.position.y = v));
    folder
      .add(c, "positionZ", -10, 10, 0.1)
      .onChange((v: number) => (mesh.position.z = v));

    // Scale
    folder
      .add(c, "width", 1, 100, 1)
      .onChange((v: number) => (mesh.scale.x = v));
    folder
      .add(c, "height", 1, 100, 1)
      .onChange((v: number) => (mesh.scale.y = v));
    folder
      .add(c, "depth", 1, 100, 1)
      .onChange((v: number) => (mesh.scale.z = v));

    // Misc
    folder.add(c, "visible").onChange((v: boolean) => (mesh.visible = v));
    folder.add(c, "spin");
  };
}
