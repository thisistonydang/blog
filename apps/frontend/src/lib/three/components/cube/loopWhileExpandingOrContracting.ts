import { MathUtils } from "three";
import { approxEq } from "@lib/math/approxEq";

import type { Mesh } from "three";
import type { World } from "../../World";
import type { Patched } from "../../types/Patched";
import type { Controls } from "./cube";

export function loopWhileExpandingOrContracting(
  world: World,
  c: Controls,
  mesh: Mesh & Patched
) {
  world.loop.runWhile(
    () => c.isExpanding && !approxEq(mesh.scale.x, 3),
    () => (mesh.scale.x = MathUtils.lerp(mesh.scale.x, 3, 0.1))
  );
  world.loop.runWhile(
    () => !c.isExpanding && !approxEq(mesh.scale.x, 1),
    () => (mesh.scale.x = MathUtils.lerp(mesh.scale.x, 1, 0.1))
  );
}
