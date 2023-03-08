import { Vector3 } from "three";

export function rgb_to_vec3({ r, g, b }: { r: number; g: number; b: number }) {
  return new Vector3(r / 255, g / 255, b / 255);
}
