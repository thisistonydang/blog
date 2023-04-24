import { GridHelper } from "three";

export function createGridHelper(size = 10): GridHelper {
  const helper = new GridHelper(size);

  return helper;
}
