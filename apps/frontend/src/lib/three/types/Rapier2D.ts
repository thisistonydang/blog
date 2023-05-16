import type RAPIER from "@dimforge/rapier2d-compat";

import type {
  Collider,
  ColliderDesc,
  RigidBody,
  RigidBodyDesc,
} from "@dimforge/rapier2d-compat";

import type { Instance } from "./Instance";

export interface PhysicsInstance extends Instance {
  // Rigid Body
  rigidBodyDesc: RigidBodyDesc;
  lockRotations?: boolean;

  // Collider
  colliderDesc?: ColliderDesc;
  activeEvents?:
    | RAPIER.ActiveEvents.COLLISION_EVENTS
    | RAPIER.ActiveEvents.CONTACT_FORCE_EVENTS;
  restitution?: number;
  friction?: number;
}

export interface PhysicsBody {
  id: string;
  rigidBody: RigidBody;
  collider: Collider;
  isSleeping?: boolean;
}
