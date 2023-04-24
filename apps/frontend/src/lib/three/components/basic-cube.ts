import { BoxGeometry, MathUtils, Mesh, MeshMatcapMaterial } from "three";

import type { UpdatableMesh } from "../systems/Loop";

export function createBasicCube(): UpdatableMesh {
  const geometry = new BoxGeometry();
  const material = new MeshMatcapMaterial();
  const cube = new Mesh(geometry, material) as unknown as UpdatableMesh;

  const radiansPerSecond = MathUtils.degToRad(30);

  cube.tick = (delta: number): void => {
    // Increase the cube's rotation each frame
    cube.rotation.z += radiansPerSecond * delta;
    cube.rotation.x += radiansPerSecond * delta;
    cube.rotation.y += radiansPerSecond * delta;
  };

  return cube;
}
