import { MathUtils } from "three";

import type { PerspectiveCamera } from "three";

/**
 * Set camera FOV so that the scene is not cropped when the viewport falls below
 * the given minAspectRatio (i.e. when the screen is too narrow).
 *
 * @param camera - three.js PerspectiveCamera
 * @param defaultCameraFov - Default camera FOV in degrees for when viewport is
 *                           above the minAspectRatio
 * @param minAspectRatio - Minimum aspect ratio
 */
export function setFov(
  camera: PerspectiveCamera,
  defaultCameraFov: number,
  minAspectRatio: number
): void {
  if (camera.aspect > minAspectRatio) {
    camera.fov = defaultCameraFov;
  } else {
    const cameraHeight = Math.tan(MathUtils.degToRad(defaultCameraFov / 2));
    const ratio = camera.aspect / minAspectRatio;
    const newCameraHeight = cameraHeight / ratio;
    camera.fov = MathUtils.radToDeg(Math.atan(newCameraHeight)) * 2;
  }
  camera.updateProjectionMatrix();
}
