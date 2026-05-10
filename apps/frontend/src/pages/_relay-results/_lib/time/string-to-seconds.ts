/**
 * Convert a time string to seconds.
 *
 * @param time - A time string in "HH:MM:SS" format.
 */
export function string_to_seconds(time: string): number {
  const array = time.split(":");
  return array[0] && array[1] && array[2]
    ? +array[0] * 60 * 60 + +array[1] * 60 + +array[2]
    : 0;
}
