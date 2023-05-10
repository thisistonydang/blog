import type RAPIER from "@dimforge/rapier2d-compat";

import type {
  Collider,
  ColliderDesc,
  RigidBody,
  RigidBodyDesc,
} from "@dimforge/rapier2d-compat";

import type { Instance } from "./Instance";

export type Rapier2D = typeof RAPIER;

export interface PhysicsInstance extends Instance {
  rigidBodyDesc: RigidBodyDesc;
  colliderDesc?: ColliderDesc;
  restitution?: number;
}

export interface PhysicsBody {
  id?: string;
  rigidBody: RigidBody;
  collider: Collider;
}
