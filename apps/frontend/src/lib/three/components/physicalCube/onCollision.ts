import { Color, Mesh, MeshMatcapMaterial } from "three";
import { approxEq } from "@lib/math/approxEq";

import type { Patched } from "@lib/three/types/Patched";
import type { World } from "@lib/three/World";

export function onCollision({
  world,
  material,
  mesh,
}: {
  world: World;
  material: MeshMatcapMaterial;
  mesh: Mesh & Patched;
}): void {
  const activeColor = new Color(0xff0000);

  mesh.onCollisionEnter = (physicsBody) => {
    world.loop.runWhile(
      () =>
        !physicsBody.isSleeping &&
        !approxEq(material.color.getHex(), activeColor.getHex()),
      () => material.color.set(material.color.lerp(activeColor, 0.025))
    );

    console.log("is colliding");
  };

  mesh.onCollisionExit = () => {
    console.log("is NOT colliding");
  };
}
