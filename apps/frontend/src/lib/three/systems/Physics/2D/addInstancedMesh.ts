import type { InstancedMesh } from "three";
import type { PhysicsBody, PhysicsInstance } from "../../../types/Rapier2D";
import type { Physics2D } from "../Physics2D";

export function addInstancedMesh({
  physics,
  instancedMesh,
  instances,
}: {
  physics: Physics2D;
  instancedMesh: InstancedMesh;
  instances: PhysicsInstance[];
}): void {
  const physicsBodies: PhysicsBody[] = [];
  let allInstancesAreFixed = true;

  instances.forEach(
    ({ id, position, rotation, rigidBodyDesc, colliderDesc, restitution }) => {
      // Describe rigid body
      rigidBodyDesc
        .setTranslation(position.x, position.y)
        .setRotation(rotation.z);

      // Create rigid body
      const rigidBody = physics.physicsWorld.createRigidBody(rigidBodyDesc);

      // Describe collider
      if (!colliderDesc) throw new Error("No colliderDesc set on instance.");
      restitution && colliderDesc.setRestitution(restitution);

      // Create collider
      const collider = physics.physicsWorld.createCollider(
        colliderDesc,
        rigidBody
      );

      physicsBodies.push({ id, rigidBody, collider });

      if (!rigidBody.isFixed()) {
        allInstancesAreFixed = false;
      }
    }
  );

  // Store rigidBody and collider in instancedMesh userData
  instancedMesh.userData.physicsBodies = physicsBodies;

  // Add instancedMesh to movableObjects if not all instances are fixed
  if (!allInstancesAreFixed) {
    physics.movableObjects.push(instancedMesh);
  }
}
