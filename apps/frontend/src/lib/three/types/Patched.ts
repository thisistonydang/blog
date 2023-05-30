import type { EventDispatcher, Intersection, Object3D } from "three";

import type { Gui } from "../systems/Gui";
import type { Physics2D } from "../systems/Physics/Physics2D";
import type { Physics3D } from "../systems/Physics/Physics3D";
import type { PhysicsBody as Physics2DBody } from "./Rapier2D";
import type { PhysicsBody as Physics3DBody } from "./Rapier3D";

export type AddPhysics2D = (physics: Physics2D) => void;
export type AddPhysics3D = (physics: Physics3D) => void;

export type CollisionEventHandler = (
  physicsBody1: Physics2DBody | Physics3DBody,
  physicsBody2: Physics2DBody | Physics3DBody
) => void;

export type SleepAndWakeEventHandler = (
  physicsBody: Physics2DBody | Physics3DBody
) => void;

/**
 * Handler for intersection events. If handler returns void, propagation stops.
 * If returns true, event will continue to propagate.
 */
export type IntersectionEventHandler = ({
  intersection,
}: {
  intersection: Intersection;
}) => void | true;

export type Tick = ({ delta }: { delta: number }) => void;

export type UpdateGui = (gui: Gui) => void;

export interface Patched {
  addPhysics2D?: AddPhysics2D;
  addPhysics3D?: AddPhysics3D;
  onCollisionEnter?: CollisionEventHandler;
  onCollisionExit?: CollisionEventHandler;
  onContactsWith?: CollisionEventHandler;
  onSleep?: SleepAndWakeEventHandler;
  onWake?: SleepAndWakeEventHandler;
  onClick?: IntersectionEventHandler;
  onPointerEnter?: IntersectionEventHandler;
  onPointerLeave?: IntersectionEventHandler;
  tickOnRenderRequest?: Tick;
  tickOnWorldStart?: Tick;
  updateGui?: UpdateGui;
}

export function isPatched(
  object: EventDispatcher | Object3D | Patched | Physics2D | Physics3D
): object is Patched {
  const patchedProperties = [
    "addPhysics2D",
    "addPhysics3D",
    "onCollisionEnter",
    "onCollisionExit",
    "onSleep",
    "onWake",
    "onClick",
    "onPointerEnter",
    "onPointerLeave",
    "tickOnRenderRequest",
    "tickOnWorldStart",
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
