import { Euler, Quaternion } from "three";

import {
  cuboidColliderDesc,
  hasCuboidGeometry,
} from "../3D/cuboidColliderDesc";

import type { World as PhysicsWorld } from "@dimforge/rapier3d-compat";
import type { InstancedMesh } from "three";

import type { PhysicsBody, PhysicsInstance } from "../../../types/Rapier3D";

const euler = new Euler();
const quaternion = new Quaternion();

export function addInstancedMesh({
  physicsWorld,
  instancedMesh,
  instances,
}: {
  physicsWorld: PhysicsWorld;
  instancedMesh: InstancedMesh;
  instances: PhysicsInstance[];
}): void {
  const physicsBodies: PhysicsBody[] = [];

  instances.forEach(
    ({ id, position, rotation, scale, rigidBodyDesc, restitution }) => {
      // Describe rigid body
      rigidBodyDesc
        .setTranslation(position.x, position.y, position.z)
        .setRotation(
          quaternion.setFromEuler(euler.set(rotation.x, rotation.y, rotation.z))
        );

      // Create rigid body
      const rigidBody = physicsWorld.createRigidBody(rigidBodyDesc);

      // Describe collider
      let colliderDesc;

      if (hasCuboidGeometry(instancedMesh)) {
        colliderDesc = cuboidColliderDesc(instancedMesh, scale);
      }

      if (!colliderDesc) throw new Error("Failed to create a colliderDesc.");

      restitution && colliderDesc.setRestitution(restitution);

      // Create collider
      const collider = physicsWorld.createCollider(colliderDesc, rigidBody);

      physicsBodies.push({ id, rigidBody, collider });
    }
  );

  // Store rigidBody and collider in instancedMesh userData
  instancedMesh.userData.physicsBodies = physicsBodies;
}
