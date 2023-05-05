import { MathUtils } from "three";

import { BaseGroup } from "../../systems/BaseGroup";
import { cube } from "../cube/cube";
import { instancedMesh } from "../instancedMesh/instancedMesh";

import type { Tick, UpdateGui } from "../../types/Patched";
import type { World } from "../../World";

interface Controls {
  visible: boolean;
  rotate: boolean;
}

export class Cubes extends BaseGroup {
  c: Controls = {
    visible: true,
    rotate: false,
  };

  // Create group
  constructor(world: World) {
    super();

    this.addObjects(world, [
      cube({ world, position: [-0.8, 0, 0] }),
      cube({ world, position: [0.8, 0, 0] }),
      instancedMesh({ world }),
    ]);
    this.visible = this.c.visible;
  }

  // Add tick on world start
  tickOnWorldStart: Tick = ({ delta }) => {
    if (this.c.rotate) {
      this.rotation.y += MathUtils.degToRad(30) * delta;
    }
  };

  // Add tweaks
  updateGui: UpdateGui = ({ createFolder }) => {
    const folder = createFolder("Cubes");

    folder.add(this.c, "visible").onChange((v: boolean) => (this.visible = v));
    folder.add(this.c, "rotate");
  };
}
