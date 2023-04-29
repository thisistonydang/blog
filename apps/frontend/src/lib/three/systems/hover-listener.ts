import { InstancedMesh } from "three";

import { hasTouchScreen } from "@lib/hooks/hasTouchScreen";
import { isPatched } from "../types/Patched";

import type { Intersection } from "three";
import type { Events } from "./Events";

export function hoverListener(events: Events, canvas: HTMLCanvasElement): void {
  if (hasTouchScreen()) return; // Don't listen for hover events on touch devices.

  let prevIntersect: Intersection | undefined = undefined;
  let newIntersect: Intersection | undefined = undefined;

  function runPrevIntersectOnPointerLeave() {
    if (
      prevIntersect &&
      isPatched(prevIntersect.object) &&
      "onPointerLeave" in prevIntersect.object
    ) {
      prevIntersect.object.onPointerLeave(prevIntersect);
    }
  }

  function runNewIntersectOnPointerEnter() {
    if (
      newIntersect &&
      isPatched(newIntersect.object) &&
      "onPointerEnter" in newIntersect.object
    ) {
      newIntersect.object.onPointerEnter(newIntersect);
    }
  }

  canvas.addEventListener("mousemove", () => {
    const intersects = events.castRay();
    newIntersect = intersects[0];

    // If no object is hovered, run previous object's onPointerLeave if
    // applicable, else do nothing.
    if (!newIntersect) {
      if (prevIntersect) {
        runPrevIntersectOnPointerLeave();
        prevIntersect = undefined;
      }
      return;
    }

    // If object hovered is different than previous object, run previous
    // object's onPointerLeave if applicable then run the new object's
    // onPointerEnter.
    if (newIntersect.object !== prevIntersect?.object) {
      runPrevIntersectOnPointerLeave();
      prevIntersect = newIntersect;
      runNewIntersectOnPointerEnter();
      return;
    }

    // If object hovered is an instanced mesh check if the instanceId has
    // changed. If so, run the previous instance's onPointerLeave if
    // applicable then run the new instance's onPointerEnter.
    if (
      newIntersect.object instanceof InstancedMesh &&
      newIntersect.instanceId !== prevIntersect?.instanceId
    ) {
      runPrevIntersectOnPointerLeave();
      prevIntersect = newIntersect;
      runNewIntersectOnPointerEnter();
      return;
    }
  });
}
