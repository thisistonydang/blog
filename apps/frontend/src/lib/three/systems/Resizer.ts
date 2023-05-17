import { MathUtils, PerspectiveCamera } from "three";
import type { World } from "../World";

export class Resizer {
  pixelRatio: number;
  minAspectRatio: number;
  defaultCameraFov: number | null = null;

  constructor(world: World, container: HTMLDivElement, minAspectRatio: number) {
    // Remember initial pixel ratio.
    this.pixelRatio = Math.min(window.devicePixelRatio, 2);

    // Set initial minimum aspect ratio and default camera fov.
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

  setSize(
    { camera, renderer, postProcessor }: World,
    container: HTMLDivElement
  ): void {
    const width = container.clientWidth;
    const height = container.clientHeight;
    const newPixelRatio = Math.min(window.devicePixelRatio, 2);

    // Reset effect composer render target in order to have correct sample size
    // for MSAA anti-aliasing if pixel ratio has changed.
    if (newPixelRatio !== this.pixelRatio) {
      postProcessor?.resetRenderTarget();

      // Remember current pixel ratio.
      this.pixelRatio = newPixelRatio;
    }

    // Set the camera's aspect ratio.
    if (camera instanceof PerspectiveCamera) {
      camera.aspect = width / height;
    }

    // Update the size of the renderer and effect composer.
    renderer.setSize(width, height);
    postProcessor?.effectComposer.setSize(width, height);

    // Set the pixel ratio of the renderer and effect composer. Note: pixel
    // ratio may change when moving across different monitors.
    renderer.setPixelRatio(newPixelRatio);
    postProcessor?.effectComposer.setPixelRatio(newPixelRatio);
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
