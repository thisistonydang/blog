import type { InstancedMesh } from "three";
import type { PhysicsBody, PhysicsInstance } from "../../../types/Rapier2D";
import type { Physics2D } from "../Physics2D";

export function addInstancedMesh({
  physics,
  instancedMesh,
  physicsInstances,
}: {
  physics: Physics2D;
  instancedMesh: InstancedMesh;
  physicsInstances: PhysicsInstance[];
}): void {
  const physicsBodies: PhysicsBody[] = [];
  let allInstancesAreFixed = true;

  physicsInstances.forEach(
    ({
      id,
      position,
      rotation,
      rigidBodyDesc,
      gravityScale,
      lockRotations,
      colliderDesc,
      activeEvents,
      restitution,
      friction,
    }) => {
      // Describe rigid body
      rigidBodyDesc.userData = { id };
      rigidBodyDesc
        .setTranslation(position.x, position.y)
        .setRotation(rotation.z);
      gravityScale && rigidBodyDesc.setGravityScale(gravityScale);
      lockRotations && rigidBodyDesc.lockRotations();

      // Create rigid body
      const rigidBody = physics.physicsWorld.createRigidBody(rigidBodyDesc);

      // Describe collider
      if (!colliderDesc) throw new Error("No colliderDesc set on instance.");
      activeEvents && colliderDesc.setActiveEvents(activeEvents);
      restitution && colliderDesc.setRestitution(restitution);
      friction && colliderDesc.setFriction(friction);

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

  // Store rigid bodies and colliders in instancedMeshMap
  physics.instanceMeshMap.set(instancedMesh, physicsBodies);

  // Add instancedMesh to movableObjects if not all instances are fixed
  if (!allInstancesAreFixed) {
    physics.movableObjects.push(instancedMesh);
  }
}
