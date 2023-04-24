import { AxesHelper } from "three";

export function createAxesHelper(size = 5): AxesHelper {
  const helper = new AxesHelper(size);

  return helper;
}
