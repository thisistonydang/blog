import type { ColliderDesc, RigidBodyDesc } from "@dimforge/rapier2d-compat";

import type RAPIER from "@dimforge/rapier2d-compat";
import type { Mesh } from "three";
import type { Physics2D } from "../Physics2D";

export function addMesh({
  physics,
  mesh,
  rigidBodyDesc,
  colliderDesc,
  activeEvents,
  restitution,
}: {
  physics: Physics2D;
  mesh: Mesh;
  rigidBodyDesc: RigidBodyDesc;
  colliderDesc: ColliderDesc;
  activeEvents?:
    | RAPIER.ActiveEvents.COLLISION_EVENTS
    | RAPIER.ActiveEvents.CONTACT_FORCE_EVENTS;
  restitution?: number;
}): void {
  // Describe rigid body
  rigidBodyDesc
    .setTranslation(mesh.position.x, mesh.position.y)
    .setRotation(mesh.rotation.z);

  // Create rigid body
  const rigidBody = physics.physicsWorld.createRigidBody(rigidBodyDesc);

  // Describe collider
  activeEvents && colliderDesc.setActiveEvents(activeEvents);
  restitution && colliderDesc.setRestitution(restitution);

  // Create collider
  const collider = physics.physicsWorld.createCollider(colliderDesc, rigidBody);

  // Store rigidBody and collider in meshMap
  physics.meshMap.set(mesh, { rigidBody, collider });

  // Add mesh to movableObjects if not a fixed body
  if (!rigidBody.isFixed()) {
    physics.movableObjects.push(mesh);
  }
}
