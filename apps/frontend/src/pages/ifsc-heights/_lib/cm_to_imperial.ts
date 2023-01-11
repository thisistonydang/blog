/**
 * Convert height (in centimeters) to a height string (in feet and inches).
 *
 * Example: 169 -> 5'6.5"
 */
export function cm_to_imperial(centimeters: number): string {
  let feet = centimeters / 30.48;
  const inches = (feet % 1) * 12;

  let inches_rounded = Math.round(inches * 2) / 2; // round to neaerst half inch

  if (inches_rounded === 12) {
    inches_rounded = 0;
    feet = feet + 1;
  }

  return `${Math.floor(feet)}'${inches_rounded}"`;
}
