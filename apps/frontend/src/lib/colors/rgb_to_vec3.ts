import { Vector3 } from "three";

// Global object for performance.
const color = new Vector3();

export function rgb_to_vec3({ r, g, b }: { r: number; g: number; b: number }) {
  color.x = r / 255;
  color.y = g / 255;
  color.z = b / 255;

  return color;
}
