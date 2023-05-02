/**
 * Check if two numbers are approximately equal within a tolerance.
 */
export function approxEq(a: number, b: number, tolerance = 1e-6): boolean {
  return Math.abs(a - b) < tolerance;
}
