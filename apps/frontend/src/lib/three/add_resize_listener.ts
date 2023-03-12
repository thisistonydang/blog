import type { PerspectiveCamera, WebGLRenderer } from "three";

/**
 * Add event listener to update camera apect and render size on resize.
 */
export function add_resize_listener(
  container: HTMLDivElement,
  camera: PerspectiveCamera,
  renderer: WebGLRenderer
): void {
  window.addEventListener("resize", () => {
    // Update camera
    camera.aspect = container.offsetWidth / container.offsetHeight;
    camera.updateProjectionMatrix();

    // Update renderer size and pixel ratio. Pixel ratio may change when moving
    // across different monitors.
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });
}
