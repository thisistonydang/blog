import { isPatched } from "../types/Patched";
import type { EventsListener } from "./EventsListener";

export function clickListener(
  eventsListener: EventsListener,
  canvas: HTMLCanvasElement
): void {
  canvas.addEventListener("click", () => {
    const intersects = eventsListener.castRay();

    for (const intersect of intersects) {
      const object = intersect.object;

      if (isPatched(object) && "onClick" in object) {
        const propagate = object.onClick(intersect);

        if (!propagate) break;
      }
    }
  });
}
