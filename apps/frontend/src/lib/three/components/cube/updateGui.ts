import { loopWhileExpandingOrContracting } from "./loopWhileExpandingOrContracting";

import type { Mesh, MeshMatcapMaterial } from "three";
import type { Patched } from "../../types/Patched";
import type { World } from "../../World";
import type { Controls } from "./cube";

export function updateGui({
  world,
  c,
  material,
  mesh,
}: {
  world: World;
  c: Controls;
  material: MeshMatcapMaterial;
  mesh: Mesh & Patched;
}): void {
  mesh.updateGui = ({ createFolder }) => {
    const folder = createFolder("cube");

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
    folder.add(c, "width", 1, 3, 1).onChange((v: number) => (mesh.scale.x = v));
    folder
      .add(c, "height", [...Array(4).keys()].splice(1))
      .onChange((v: number) => (mesh.scale.y = v));
    folder
      .add(c, "depth", { depth1: 1, depth2: 2, depth3: 3 })
      .onChange((v: number) => (mesh.scale.z = v));

    // Misc
    folder.add(c, "visible").onChange((v: boolean) => (mesh.visible = v));
    folder
      .add(c, "isExpanding")
      .onChange(() => loopWhileExpandingOrContracting(world, c, mesh))
      .listen();
    folder.add(c, "spin");
  };
}
