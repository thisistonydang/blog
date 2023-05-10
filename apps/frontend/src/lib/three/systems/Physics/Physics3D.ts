import RAPIER from "@dimforge/rapier3d-compat";
import { InstancedMesh, Matrix4, Mesh, Quaternion, Vector3 } from "three";

import { isPatched } from "../../types/Patched";
import { Physics } from "./Physics";

import type { World as PhysicsWorld3D } from "@dimforge/rapier3d-compat";

import type { PhysicsBody } from "../../types/Rapier3D";
import type { World } from "../../World";

const positionVector = new Vector3();
const quaternion = new Quaternion();
const scaleVector = new Vector3();
const matrix = new Matrix4();

export class Physics3D extends Physics {
  physicsWorld: PhysicsWorld3D;
  meshMap = new WeakMap<Mesh, PhysicsBody>();
  instanceMeshMap = new WeakMap<InstancedMesh, PhysicsBody[]>();

  constructor(world: World) {
    super(world);

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
    this.movableObjects.forEach((mesh) => {
      if (mesh instanceof InstancedMesh) {
        const physicsBodies = this.instanceMeshMap.get(mesh);

        physicsBodies?.forEach(({ rigidBody }, index) => {
          // Do nothing if instance is fixed
          if (rigidBody.isFixed()) return;

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
        mesh.computeBoundingSphere();
      } else if (mesh instanceof Mesh) {
        const rigidBody = this.meshMap.get(mesh)?.rigidBody;
        if (!rigidBody) return;

        const position = rigidBody.translation();
        mesh.position.set(position.x, position.y, position.z);

        const rotation = rigidBody.rotation();
        mesh.quaternion.set(rotation.x, rotation.y, rotation.z, rotation.w);
      }
    });
  }
}
