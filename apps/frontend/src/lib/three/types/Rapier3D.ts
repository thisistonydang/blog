import type RAPIER from "@dimforge/rapier3d-compat";

import type {
  Collider,
  RigidBody,
  RigidBodyDesc,
} from "@dimforge/rapier3d-compat";

import type { Instance } from "./Instance";

export type Rapier3D = typeof RAPIER;

export interface PhysicsInstance extends Instance {
  rigidBodyDesc: RigidBodyDesc;
  restitution?: number;
}

export interface PhysicsBody {
  id: string;
  rigidBody: RigidBody;
  collider: Collider;
}
