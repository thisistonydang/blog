import type { ColliderDesc, RigidBodyDesc } from "@dimforge/rapier3d-compat";

import type RAPIER from "@dimforge/rapier3d-compat";
import type { Mesh } from "three";
import type { Physics3D } from "../Physics3D";

export function addMesh({
  physics,
  mesh,
  rigidBodyDesc,
  gravityScale,
  lockRotations,
  colliderDesc,
  activeEvents,
  restitution,
  friction,
}: {
  physics: Physics3D;
  mesh: Mesh;
  rigidBodyDesc: RigidBodyDesc;
  gravityScale?: number;
  lockRotations?: boolean;
  colliderDesc: ColliderDesc;
  activeEvents?:
    | RAPIER.ActiveEvents.COLLISION_EVENTS
    | RAPIER.ActiveEvents.CONTACT_FORCE_EVENTS;
  restitution?: number;
  friction?: number;
}): void {
  // Describe rigid body
  rigidBodyDesc.userData = { id: mesh.name };
  rigidBodyDesc
    .setTranslation(mesh.position.x, mesh.position.y, mesh.position.z)
    .setRotation(mesh.quaternion);
  gravityScale && rigidBodyDesc.setGravityScale(gravityScale);
  lockRotations && rigidBodyDesc.lockRotations();

  // Create rigid body
  const rigidBody = physics.physicsWorld.createRigidBody(rigidBodyDesc);

  // Describe collider
  activeEvents && colliderDesc.setActiveEvents(activeEvents);
  restitution && colliderDesc.setRestitution(restitution);
  friction && colliderDesc.setFriction(friction);

  // Create collider
  const collider = physics.physicsWorld.createCollider(colliderDesc, rigidBody);

  // Store rigidBody and collider in meshMap
  physics.meshMap.set(mesh, { id: mesh.name, rigidBody, collider });

  // Add mesh to movableObjects if not a fixed body
  if (!rigidBody.isFixed()) {
    physics.movableObjects.push(mesh);
  }
}
