import { Color, InstancedMesh } from "three";
import { approxEq } from "@lib/math/approxEq";
import { updateInstanceColors } from "@lib/three/utils/instances/updateInstanceColors";
import { instances } from "./instances";

import type { Patched } from "@lib/three/types/Patched";
import type { World } from "@lib/three/World";

export function onSleepAndWake({
  world,
  instancedMesh,
}: {
  world: World;
  instancedMesh: InstancedMesh & Patched;
}): void {
  instancedMesh.onSleep = (physicsBody) => {
    const instance = instances.find(({ id }) => id === physicsBody.id);
    if (!instance) return;

    const currentColor = new Color(instance.color);
    const orignalColor = new Color(0x00ffff);

    world.loop.runWhile(
      () =>
        Boolean(physicsBody.isSleeping) &&
        !approxEq(instance.color, orignalColor.getHex()),
      () => {
        instance.color = currentColor.lerp(orignalColor, 0.025).getHex();
        updateInstanceColors(instancedMesh, instances);
      }
    );

    console.log(physicsBody.id, "is sleeping");
  };

  instancedMesh.onWake = ({ id }) => {
    console.log(id, "is awake");
  };
}
