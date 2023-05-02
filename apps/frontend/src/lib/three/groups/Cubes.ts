import { MathUtils } from "three";

import { createInstancedMesh } from "../components/instanced-mesh/instanced-mesh";
import { createCube } from "../components/cube/cube";
import { BaseGroup } from "../systems/BaseGroup";

import type { Gui } from "../systems/Gui";
import type { World } from "../World";

export class Cubes extends BaseGroup {
  // Tweakable controls
  c = {
    visible: true,
    rotate: false,
  };

  // Create group
  constructor(world: World) {
    super();

    this.addObjects(world, [
      createCube({ world, position: [-0.8, 0, 0] }),
      createCube({ world, position: [0.8, 0, 0] }),
      createInstancedMesh({ world }),
    ]);
    this.visible = this.c.visible;
  }

  // Add tick function
  tick(delta: number) {
    if (this.c.rotate) {
      this.rotation.y += MathUtils.degToRad(30) * delta;
    }
  }

  // Add tweaks
  updateGui({ createFolder }: Gui) {
    const folder = createFolder("cubes");

    folder.add(this.c, "visible").onChange((v: boolean) => (this.visible = v));
    folder.add(this.c, "rotate");
  }
}
