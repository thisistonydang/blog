import { Euler, Quaternion } from "three";

import type { InstancedMesh } from "three";
import type { PhysicsBody, PhysicsInstance } from "../../../types/Rapier3D";
import type { Physics3D } from "../Physics3D";

const euler = new Euler();
const quaternion = new Quaternion();

export function addInstancedMesh({
  physics,
  instancedMesh,
  physicsInstances,
}: {
  physics: Physics3D;
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
        .setTranslation(position.x, position.y, position.z)
        .setRotation(
          quaternion.setFromEuler(euler.set(rotation.x, rotation.y, rotation.z))
        );
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
