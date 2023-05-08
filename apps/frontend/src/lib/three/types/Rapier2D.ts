import type RAPIER from "@dimforge/rapier2d-compat";
import type { Collider, RigidBody } from "@dimforge/rapier2d-compat";

export type Rapier2D = typeof RAPIER;

export interface PhysicsBody {
  rigidBody: RigidBody;
  collider: Collider;
}
