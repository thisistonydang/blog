import { WebGLRenderer } from "three";

export function createRenderer(): WebGLRenderer {
  const renderer = new WebGLRenderer({ alpha: true, antialias: true });

  return renderer;
}
