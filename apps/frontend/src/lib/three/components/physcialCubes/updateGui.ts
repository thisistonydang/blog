import type { InstancedMesh } from "three";
import type { Patched } from "@lib/three/types/Patched";
import type { Controls } from "./physicalCubes";

export function updateGui({
  c,
  instancedMesh,
}: {
  c: Controls;
  instancedMesh: InstancedMesh & Patched;
}): void {
  instancedMesh.updateGui = ({ createFolder }) => {
    const folder = createFolder("physical cubes");

    folder
      .add(c, "visible")
      .onChange((v: boolean) => (instancedMesh.visible = v));
    folder.add(c, "spin");
  };
}
