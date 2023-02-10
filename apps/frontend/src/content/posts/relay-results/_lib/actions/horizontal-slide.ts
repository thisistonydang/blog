/**
 * Update an SVG element's width after a set delay.
 */
export function horizontal_slide(
  node: SVGElement,
  { width, delay }: { width: number; delay: number }
) {
  setTimeout(() => node.setAttribute("width", width.toString()), 1 + delay);
}
