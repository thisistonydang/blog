import type RAPIER from "@dimforge/rapier3d-compat";
import type { Collider, RigidBody } from "@dimforge/rapier3d-compat";

export type Rapier3D = typeof RAPIER;

export interface PhysicsBody {
  rigidBody: RigidBody;
  collider: Collider;
}
