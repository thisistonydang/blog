/**
 * Covert seconds to string format.
 **/
export function seconds_to_string(seconds: number): string {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds - hrs * 3600) / 60);
  const secs = Math.round(seconds - hrs * 3600 - mins * 60);
  const h = `${hrs}`;
  let m = `${mins}`;
  let s = `${secs}`;

  if (secs < 10) s = `0${secs}`;
  if (seconds < 3600) return `${m}:${s}`;
  if (mins < 10) m = `0${mins}`;
  return `${h}:${m}:${s}`;
}
