import { Color, InstancedMesh } from "three";
import { approxEq } from "@lib/math/approxEq";
import { updateInstanceColors } from "@lib/three/utils/instances/updateInstanceColors";
import { instances } from "./instances";

import type { Patched } from "@lib/three/types/Patched";
import type { World } from "@lib/three/World";

export function onCollision({
  world,
  instancedMesh,
}: {
  world: World;
  instancedMesh: InstancedMesh & Patched;
}): void {
  instancedMesh.onCollisionEnter = (physicsBody) => {
    const instance = instances.find(({ id }) => id === physicsBody.id);
    if (!instance) return;

    const currentColor = new Color(instance.color);
    const activeColor = new Color(0xff0000);

    world.loop.runWhile(
      () =>
        !physicsBody.isSleeping &&
        !approxEq(instance.color, activeColor.getHex()),
      () => {
        instance.color = currentColor.lerp(activeColor, 0.025).getHex();
        updateInstanceColors(instancedMesh, instances);
      }
    );

    console.log(physicsBody.id, "is colliding");
  };

  instancedMesh.onCollisionExit = ({ id }) => {
    console.log(id, "is NOT colliding");
  };
}
