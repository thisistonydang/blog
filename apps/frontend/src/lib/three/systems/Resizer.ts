import type { World } from "../World";

export class Resizer {
  constructor(world: World, container: HTMLDivElement) {
    // Set initial size on load.
    this.setSize(world, container);

    // Set size again if a resize event occurs.
    window.addEventListener("resize", () => {
      this.setSize(world, container);

      // If rendering on demand, request a render.
      if (world.loop.frameloop === "demand") {
        world.requestRender();
      }
    });
  }

  setSize({ camera, renderer }: World, container: HTMLDivElement): void {
    // Set the camera's aspect ratio.
    camera.aspect = container.clientWidth / container.clientHeight;

    // Update the camera's frustum.
    camera.updateProjectionMatrix();

    // Update the size of the renderer.
    renderer.setSize(container.clientWidth, container.clientHeight);

    // Set the pixel ratio. Note: pixel ratio may change when moving across
    // different monitors.
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }
}
