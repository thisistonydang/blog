import { Group, Object3D } from "three";

import type { World } from "../World";

export class BaseGroup extends Group {
  /**
   * Add objects to group and relevant systems
   */
  addObjects(world: World, objects: Object3D[]): void {
    objects.forEach((object) => {
      this.add(object);
      world.updateSystems(object);
    });
  }
}
