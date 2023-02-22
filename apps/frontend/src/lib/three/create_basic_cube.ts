import { BoxGeometry, Mesh, MeshBasicMaterial } from "three";

export function create_basic_cube(): Mesh {
  const geometry = new BoxGeometry();
  const material = new MeshBasicMaterial({ color: 0x0000ff });
  const box = new Mesh(geometry, material);

  return box;
}
