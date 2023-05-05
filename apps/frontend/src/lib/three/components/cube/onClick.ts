import { loopWhileExpandingOrContracting } from "./loopWhileExpandingOrContracting";

import type { Mesh } from "three";
import type { Patched } from "../../types/Patched";
import type { World } from "../../World";
import type { Controls } from "./cube";

export function onClick({
  world,
  c,
  mesh,
}: {
  world: World;
  c: Controls;
  mesh: Mesh & Patched;
}): void {
  mesh.onClick = () => {
    c.isExpanding = !c.isExpanding;
    loopWhileExpandingOrContracting(world, c, mesh);
  };
}
