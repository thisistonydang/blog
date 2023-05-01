import { isPatched } from "../types/Patched";
import type { Events } from "./Events";

export function clickListener({ world, castRay }: Events): void {
  world.renderer.domElement.addEventListener("click", () => {
    const intersections = castRay();

    for (const intersection of intersections) {
      const object = intersection.object;

      if (isPatched(object) && "onClick" in object) {
        const propagate = object.onClick({ intersection, world });
        world.requestRender();

        if (!propagate) break;
      }
    }
  });
}
