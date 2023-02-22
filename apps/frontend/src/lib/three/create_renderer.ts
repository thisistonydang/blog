import { WebGLRenderer } from "three";

/**
 * Create renderer given container sizes.
 */
export function create_renderer(sizes: {
  width: number;
  height: number;
}): WebGLRenderer {
  const renderer = new WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

  return renderer;
}
