import { Color, Mesh, MeshMatcapMaterial } from "three";
import { approxEq } from "@lib/math/approxEq";

import type { Patched } from "@lib/three/types/Patched";
import type { World } from "@lib/three/World";
import type { Controls } from "./physicalCube";

export function onSleepAndWake({
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
  const originalColor = new Color(c.color);

  mesh.onSleep = (physicsBody) => {
    world.loop.runWhile(
      () =>
        Boolean(physicsBody.isSleeping) &&
        !approxEq(material.color.getHex(), originalColor.getHex()),
      () => material.color.set(material.color.lerp(originalColor, 0.025))
    );

    console.log("sleep");
  };

  mesh.onWake = () => {
    console.log("wake");
  };
}
