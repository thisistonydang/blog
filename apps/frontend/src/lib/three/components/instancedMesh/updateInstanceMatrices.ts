import { Euler, Matrix4, Quaternion, Vector3 } from "three";

import type { InstancedMesh } from "three";
import type { Instance } from "./instances";

const positionVector = new Vector3();
const euler = new Euler();
const quaternion = new Quaternion();
const scaleVector = new Vector3();
const matrix = new Matrix4();

export function updateInstanceMatrices(
  mesh: InstancedMesh,
  instances: Instance[]
): void {
  instances.forEach(({ position, rotation, scale }, index) => {
    // Set position
    positionVector.set(position.x, position.y, 0);

    // Set rotation
    if (rotation) {
      euler.set(rotation, rotation, rotation);
    } else {
      euler.set(0, 0, 0);
    }
    quaternion.setFromEuler(euler);

    // Set scale
    if (scale) {
      scaleVector.set(scale.x, scale.y, scale.z);
    } else {
      scaleVector.set(1, 1, 1);
    }

    // Update instance matrix
    matrix.compose(positionVector, quaternion, scaleVector);
    mesh.setMatrixAt(index, matrix);
    mesh.instanceMatrix.needsUpdate = true;
  });
}
