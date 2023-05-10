import type { Mesh } from "three";

import type { Physics2D } from "@lib/three/systems/Physics/Physics2D";
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
    const rigidBody = (world.physics as Physics2D).meshMap.get(mesh)?.rigidBody;

    rigidBody?.applyImpulse({ x: 0.0, y: 10.0 }, true);
    world.runWhileAwake();
  };
}
