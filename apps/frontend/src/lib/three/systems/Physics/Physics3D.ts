import { InstancedMesh, Matrix4, Quaternion, Vector3 } from "three";
import { isPatched } from "../../types/Patched";
import { Physics } from "./Physics";

import type {
  RigidBody,
  World as PhysicsWorld3D,
} from "@dimforge/rapier3d-compat";

import type { PhysicsBody, Rapier3D } from "../../types/Rapier3D";
import type { World } from "../../World";

const positionVector = new Vector3();
const quaternion = new Quaternion();
const scaleVector = new Vector3();
const matrix = new Matrix4();

export class Physics3D extends Physics {
  physicsWorld: PhysicsWorld3D;
  RAPIER: Rapier3D;

  constructor(world: World, RAPIER: Rapier3D) {
    super(world);
    this.RAPIER = RAPIER;

    const gravity = { x: 0.0, y: -9.81, z: 0.0 };
    this.physicsWorld = new RAPIER.World(gravity);
  }

  init(): void {
    this.objects.forEach((object) => {
      if (isPatched(object) && "addPhysics3D" in object) {
        object.addPhysics3D(this);
      }
    });
  }

  updateThreeJsObjects(): void {
    this.objects.forEach((mesh) => {
      if (mesh instanceof InstancedMesh) {
        const physicsBodies: PhysicsBody[] = mesh.userData.physicsBodies;

        physicsBodies.forEach(({ rigidBody }, index) => {
          // Get position from physics world
          const position = rigidBody.translation();
          positionVector.set(position.x, position.y, position.z);

          // Get rotation from physics world
          const rotation = rigidBody.rotation();
          quaternion.set(rotation.x, rotation.y, rotation.z, rotation.w);

          // Get scale from current instance scale
          mesh.getMatrixAt(index, matrix);
          scaleVector.setFromMatrixScale(matrix);

          // Update instance matrix
          matrix.compose(positionVector, quaternion, scaleVector);
          mesh.setMatrixAt(index, matrix);
        });

        mesh.instanceMatrix.needsUpdate = true;
      } else {
        const rigidBody: RigidBody = mesh.userData.rigidBody;

        const position = rigidBody.translation();
        mesh.position.set(position.x, position.y, position.z);

        const rotation = rigidBody.rotation();
        mesh.quaternion.set(rotation.x, rotation.y, rotation.z, rotation.w);
      }
    });
  }
}
