import RAPIER from "@dimforge/rapier2d-compat";
import { Euler, InstancedMesh, Matrix4, Quaternion, Vector3 } from "three";

import { isPatched } from "../../types/Patched";
import { Physics } from "./Physics";

import type {
  RigidBody,
  World as PhysicsWorld2D,
} from "@dimforge/rapier2d-compat";

import type { PhysicsBody } from "../../types/Rapier2D";
import type { World } from "../../World";

const positionVector = new Vector3();
const euler = new Euler();
const quaternion = new Quaternion();
const scaleVector = new Vector3();
const matrix = new Matrix4();

export class Physics2D extends Physics {
  physicsWorld: PhysicsWorld2D;

  constructor(world: World) {
    super(world);

    const gravity = { x: 0.0, y: -9.81 };
    this.physicsWorld = new RAPIER.World(gravity);
  }

  init(): void {
    this.objects.forEach((object) => {
      if (isPatched(object) && "addPhysics2D" in object) {
        object.addPhysics2D(this);
      }
    });
  }

  updateThreeJsObjects(): void {
    this.movableObjects.forEach((mesh) => {
      if (mesh instanceof InstancedMesh) {
        const physicsBodies: PhysicsBody[] = mesh.userData.physicsBodies;

        physicsBodies.forEach(({ rigidBody }, index) => {
          // Do nothing if instance is fixed
          if (rigidBody.isFixed()) return;

          // Get position from physics world
          const position = rigidBody.translation();
          positionVector.set(position.x, position.y, 0);

          // Get rotation from physics world
          const rotation = rigidBody.rotation();
          quaternion.setFromEuler(euler.set(0, 0, rotation));

          // Get scale from current instance scale
          mesh.getMatrixAt(index, matrix);
          scaleVector.setFromMatrixScale(matrix);

          // Update instance matrix
          matrix.compose(positionVector, quaternion, scaleVector);
          mesh.setMatrixAt(index, matrix);
        });

        mesh.instanceMatrix.needsUpdate = true;
        mesh.computeBoundingSphere();
      } else {
        const rigidBody: RigidBody = mesh.userData.rigidBody;

        const position = rigidBody.translation();
        mesh.position.x = position.x;
        mesh.position.y = position.y;

        const rotation = rigidBody.rotation();
        mesh.rotation.z = rotation;
      }
    });
  }
}
