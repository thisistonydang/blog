import { BoxGeometry, Mesh, MeshBasicMaterial } from "three";

export function createBasicCube(): Mesh {
  const geometry = new BoxGeometry();
  const material = new MeshBasicMaterial({ color: 0x0000ff });
  const cube = new Mesh(geometry, material);

  return cube;
}
