import type GUI from "lil-gui";
import type { EventDispatcher, Intersection, Object3D } from "three";

/**
 * Handler for intersection events. If handler returns void, propagation stops.
 * If returns true, event will continue to propagate.
 */
type IntersectionEventHandler = (e: Intersection) => void | true;

export interface Patched {
  onClick?: IntersectionEventHandler;
  onPointerEnter?: IntersectionEventHandler;
  onPointerLeave?: IntersectionEventHandler;
  tick?: (delta: number) => void;
  updateGui?: (gui: GUI) => void;
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
