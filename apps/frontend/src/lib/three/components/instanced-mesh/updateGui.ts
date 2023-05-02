import type { InstancedMesh } from "three";
import type { Patched } from "@lib/three/types/Patched";
import type { Controls } from "./index";

export function updateGui({
  c,
  mesh,
}: {
  c: Controls;
  mesh: InstancedMesh & Patched;
}): void {
  mesh.updateGui = ({ createFolder }) => {
    const folder = createFolder("instanced mesh");

    folder.add(c, "visible").onChange((v: boolean) => (mesh.visible = v));
    folder.add(c, "spin");
  };
}
