import { WebGLRenderer } from "three";

export function webGLRenderer({
  alpha = true,
  antialias = true,
}: {
  alpha?: boolean;
  antialias?: boolean;
}) {
  // Create renderer
  const renderer = new WebGLRenderer({ alpha, antialias });

  // Turn on the physically correct lighting model
  renderer.useLegacyLights = false;

  return renderer;
}
