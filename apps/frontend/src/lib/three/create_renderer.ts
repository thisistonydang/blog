import { WebGLRenderer } from "three";

/**
 * Create renderer given container sizes.
 */
export function create_renderer(container: HTMLDivElement): WebGLRenderer {
  const renderer = new WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(container.offsetWidth, container.offsetHeight);
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

  return renderer;
}
