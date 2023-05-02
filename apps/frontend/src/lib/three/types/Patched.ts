import type { EventDispatcher, Intersection, Object3D } from "three";
import type { Gui } from "../systems/Gui";
import type { Frameloop } from "../systems/Loop";

/**
 * Handler for intersection events. If handler returns void, propagation stops.
 * If returns true, event will continue to propagate.
 */
type IntersectionEventHandler = ({
  intersection,
}: {
  intersection: Intersection;
}) => void | true;

export interface Patched {
  onClick?: IntersectionEventHandler;
  onPointerEnter?: IntersectionEventHandler;
  onPointerLeave?: IntersectionEventHandler;
  tick?: ({
    delta,
    frameloop,
  }: {
    delta: number;
    frameloop: Frameloop;
  }) => void;
  updateGui?: (gui: Gui) => void;
}

export function isPatched(
  object: EventDispatcher | Object3D | Patched
): object is Patched {
  const patchedProperties = [
    "onClick",
    "onPointerEnter",
    "onPointerLeave",
    "tick",
    "updateGui",
  ];

  // If any patched property exists, return true.
  for (const property of patchedProperties) {
    if (property in (object as Patched)) {
      return true;
    }
  }

  // If none of the properties exist, return false.
  return false;
}
