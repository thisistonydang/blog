import type { ColliderDesc, RigidBodyDesc } from "@dimforge/rapier3d-compat";

import type { Mesh } from "three";
import type { Physics3D } from "../Physics3D";

export function addMesh({
  physics,
  mesh,
  rigidBodyDesc,
  colliderDesc,
  restitution = 0,
}: {
  physics: Physics3D;
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
  const rigidBody = physics.physicsWorld.createRigidBody(rigidBodyDesc);

  // Describe collider
  colliderDesc.setRestitution(restitution);

  // Create collider
  const collider = physics.physicsWorld.createCollider(colliderDesc, rigidBody);

  // Store rigidBody and collider in mesh userData
  mesh.userData.rigidBody = rigidBody;
  mesh.userData.collider = collider;

  // Add mesh to movableObjects if not a fixed body
  if (!rigidBody.isFixed()) {
    physics.movableObjects.push(mesh);
  }
}
