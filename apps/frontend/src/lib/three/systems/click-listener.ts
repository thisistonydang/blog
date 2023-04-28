import { isPatched } from "../types/Patched";
import type { Events } from "./Events";

export function clickListener(events: Events, canvas: HTMLCanvasElement): void {
  canvas.addEventListener("click", () => {
    const intersects = events.castRay();

    for (const intersect of intersects) {
      const object = intersect.object;

      if (isPatched(object) && "onClick" in object) {
        const propagate = object.onClick(intersect);

        if (!propagate) break;
      }
    }
  });
}
