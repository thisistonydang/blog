import { Euler, Matrix4, Quaternion, Vector3 } from "three";

import type { InstancedMesh } from "three";
import type { Instance } from "../../types/Instance";

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
    positionVector.set(position.x, position.y, position.z);

    // Set rotation
    euler.set(rotation.x, rotation.y, rotation.z);
    quaternion.setFromEuler(euler);

    // Set scale
    scaleVector.set(scale.x, scale.y, scale.z);

    // Update instance matrix
    matrix.compose(positionVector, quaternion, scaleVector);
    mesh.setMatrixAt(index, matrix);
  });

  mesh.instanceMatrix.needsUpdate = true;
}
