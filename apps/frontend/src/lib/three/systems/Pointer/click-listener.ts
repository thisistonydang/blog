import { isPatched } from "../../types/Patched";
import type { Pointer } from "./Pointer";

export function clickListener({ world, castRay }: Pointer): void {
  world.renderer.domElement.addEventListener("click", () => {
    const intersections = castRay();

    for (const intersection of intersections) {
      const object = intersection.object;

      if (isPatched(object) && "onClick" in object) {
        const propagate = object.onClick({ intersection });
        world.requestRender();

        if (!propagate) break;
      }
    }
  });
}
