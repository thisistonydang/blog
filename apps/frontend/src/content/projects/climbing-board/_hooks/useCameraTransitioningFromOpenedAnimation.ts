import { useFrame } from "@react-three/fiber";
import { useContext } from "react";
import { MathUtils, PerspectiveCamera } from "three";

import { BoardWidthContext } from "../_context/BoardWidthContext";
import { ControlsModeContext } from "../_context/ControlsModeContext";
import {
  DEFAULT_CAMERA_FOV,
  MAX_BOARD_HEIGHT,
} from "../_lib/constants/constants.js";
import { resizeFov } from "../_lib/three/resizeFov";

export function useCameraTransitioningFromOpenedAnimation(
  browseAndEditCameraHeight: number
) {
  const { boardWidth } = useContext(BoardWidthContext);
  const { controlsMode, setControlsMode } = useContext(ControlsModeContext);
  const finalCameraPosition = {
    x: 0,
    y: browseAndEditCameraHeight,
    z: 10,
  };
  const INTERPOLATION_FACTOR = 0.1;
  const TOLERANCE = 0.01;

  useFrame(({ camera, invalidate }) => {
    if (!(camera instanceof PerspectiveCamera)) return;

    if (
      controlsMode === "transitioning_to_browse" ||
      controlsMode === "transitioning_to_edit"
    ) {
      // Ensure entire board is visible for editing.
      const boardRatio = boardWidth / MAX_BOARD_HEIGHT;
      const minAspectRatio =
        boardRatio < 12 / MAX_BOARD_HEIGHT ? 12 / MAX_BOARD_HEIGHT : boardRatio;
      resizeFov(camera, DEFAULT_CAMERA_FOV, minAspectRatio);

      camera.lookAt(0, browseAndEditCameraHeight, 0);
      camera.position.x = MathUtils.lerp(
        camera.position.x,
        finalCameraPosition.x,
        INTERPOLATION_FACTOR
      );
      camera.position.y = MathUtils.lerp(
        camera.position.y,
        finalCameraPosition.y,
        INTERPOLATION_FACTOR
      );
      camera.position.z = MathUtils.lerp(
        camera.position.z,
        finalCameraPosition.z,
        INTERPOLATION_FACTOR
      );

      if (
        Math.abs(camera.position.x - finalCameraPosition.x) < TOLERANCE &&
        Math.abs(camera.position.y - finalCameraPosition.y) < TOLERANCE &&
        Math.abs(camera.position.z - finalCameraPosition.z) < TOLERANCE
      ) {
        camera.position.set(
          finalCameraPosition.x,
          finalCameraPosition.y,
          finalCameraPosition.z
        );

        if (controlsMode === "transitioning_to_browse") {
          setControlsMode("browse");
        } else if (controlsMode === "transitioning_to_edit") {
          setControlsMode("edit");
        }
      }

      invalidate();
    }
  });
}
