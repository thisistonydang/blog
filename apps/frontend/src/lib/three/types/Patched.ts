import type { EventDispatcher, Intersection, Object3D } from "three";

import type { Gui } from "../systems/Gui";
import type { Frameloop } from "../systems/Loop";
import type { Physics2D } from "../systems/Physics2D";
import type { Physics3D } from "../systems/Physics3D";

export type AddPhysics = (physics: Physics2D | Physics3D) => void;

/**
 * Handler for intersection events. If handler returns void, propagation stops.
 * If returns true, event will continue to propagate.
 */
export type IntersectionEventHandler = ({
  intersection,
}: {
  intersection: Intersection;
}) => void | true;

export type Tick = ({
  delta,
  frameloop,
}: {
  delta: number;
  frameloop: Frameloop;
}) => void;

export type UpdateGui = (gui: Gui) => void;

export interface Patched {
  addPhysics?: AddPhysics;
  onClick?: IntersectionEventHandler;
  onPointerEnter?: IntersectionEventHandler;
  onPointerLeave?: IntersectionEventHandler;
  tick?: Tick;
  updateGui?: UpdateGui;
}

export function isPatched(
  object: EventDispatcher | Object3D | Patched
): object is Patched {
  const patchedProperties = [
    "addPhysics",
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
