import type { Mesh } from "three";

import type { Patched } from "@lib/three/types/Patched";
import type { World } from "@lib/three/World";

export function onClick({
  world,
  mesh,
}: {
  world: World;
  mesh: Mesh & Patched;
}): void {
  mesh.onClick = () => {
    const rigidBody = mesh.userData.rigidBody;
    rigidBody.applyImpulse({ x: 0.0, y: 10.0, z: 0.0 }, true);
    world.runWhileAwake();
  };
}
