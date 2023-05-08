import type {
  ColliderDesc,
  RigidBodyDesc,
  World as PhysicsWorld,
} from "@dimforge/rapier3d-compat";

import type { Mesh } from "three";

export function addMesh({
  physicsWorld,
  mesh,
  rigidBodyDesc,
  colliderDesc,
  restitution = 0,
}: {
  physicsWorld: PhysicsWorld;
  mesh: Mesh;
  rigidBodyDesc: RigidBodyDesc;
  colliderDesc: ColliderDesc;
  restitution?: number;
}): void {
  const position = mesh.position;
  const quaternion = mesh.quaternion;

  // Describe rigid body
  rigidBodyDesc
    .setTranslation(position.x, position.y, position.z)
    .setRotation(quaternion);

  // Create rigid body
  const rigidBody = physicsWorld.createRigidBody(rigidBodyDesc);

  // Describe collider
  colliderDesc.setRestitution(restitution);

  // Create collider
  const collider = physicsWorld.createCollider(colliderDesc, rigidBody);

  // Store rigidBody and collider in mesh userData
  mesh.userData.rigidBody = rigidBody;
  mesh.userData.collider = collider;
}
