import { MathUtils, PerspectiveCamera } from "three";
import type { World } from "../World";

export class Resizer {
  minAspectRatio: number;
  defaultCameraFov: number | null = null;

  constructor(world: World, container: HTMLDivElement, minAspectRatio: number) {
    // Set initial minimum aspect ratio and default camera fov
    this.minAspectRatio = minAspectRatio;
    if (world.camera instanceof PerspectiveCamera) {
      this.defaultCameraFov = world.camera.fov;
    }

    // Set initial size and fov on load.
    this.setSize(world, container);
    this.setFov(world);
    world.camera.updateProjectionMatrix();

    // Set size and fov again if a resize event occurs.
    window.addEventListener("resize", () => {
      this.setSize(world, container);
      this.setFov(world);
      world.camera.updateProjectionMatrix();

      // If rendering on demand, request a render.
      if (world.loop.frameloop === "demand") {
        world.requestRender();
      }
    });
  }

  setSize({ camera, renderer }: World, container: HTMLDivElement): void {
    // Set the camera's aspect ratio.
    if (camera instanceof PerspectiveCamera) {
      camera.aspect = container.clientWidth / container.clientHeight;
    }

    // Update the size of the renderer.
    renderer.setSize(container.clientWidth, container.clientHeight);

    // Set the pixel ratio. Note: pixel ratio may change when moving across
    // different monitors.
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  /**
   * Set camera FOV so that the scene is not cropped when the viewport falls
   * below the given minAspectRatio (i.e. when the screen is too narrow).
   */
  setFov({ camera }: World): void {
    if (!(camera instanceof PerspectiveCamera) || !this.defaultCameraFov) {
      return;
    }

    if (camera.aspect > this.minAspectRatio) {
      camera.fov = this.defaultCameraFov;
    } else {
      const cameraHeight = Math.tan(
        MathUtils.degToRad(this.defaultCameraFov / 2)
      );
      const ratio = camera.aspect / this.minAspectRatio;
      const newCameraHeight = cameraHeight / ratio;
      camera.fov = MathUtils.radToDeg(Math.atan(newCameraHeight)) * 2;
    }
  }
}
