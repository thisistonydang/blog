import { WebGLRenderer } from "three";

export function createRenderer(): WebGLRenderer {
  const renderer = new WebGLRenderer({ alpha: true, antialias: true });

  // Turn on the physically correct lighting model
  renderer.useLegacyLights = false;

  return renderer;
}
