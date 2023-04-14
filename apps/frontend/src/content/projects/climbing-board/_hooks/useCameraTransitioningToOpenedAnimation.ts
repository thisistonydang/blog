import { useFrame, useThree } from "@react-three/fiber";
import { useContext, useRef } from "react";
import { MathUtils, PerspectiveCamera } from "three";

import { ALLOWED_WIDTHS } from "../_context/BoardWidthContext";
import { ControlsModeContext } from "../_context/ControlsModeContext";
import {
  DEFAULT_CAMERA_FOV,
  MAX_BOARD_HEIGHT,
} from "../_lib/constants/constants";
import { resizeFov } from "../_lib/three/resizeFov";

export function useCameraTransitioningToOpenedAnimation() {
  const { controlsMode, setControlsMode } = useContext(ControlsModeContext);
  const { camera } = useThree();

  // Remember default camera position on startup.
  const defaultCameraPosition = useRef({
    x: camera.position.x,
    y: camera.position.y,
    z: camera.position.z,
  });

  useFrame(({ camera, invalidate }) => {
    const MAX_BOARD_WIDTH = ALLOWED_WIDTHS.at(-1);
    if (!(camera instanceof PerspectiveCamera) || !MAX_BOARD_WIDTH) return;

    const INTERPOLATION_FACTOR = 0.1;

    if (controlsMode === "transitioning_to_opened") {
      // Reset FOV.
      resizeFov(
        camera,
        DEFAULT_CAMERA_FOV,
        MAX_BOARD_WIDTH / MAX_BOARD_HEIGHT // minAspectRatio
      );

      camera.lookAt(0, 0, 0);
      camera.position.x = MathUtils.lerp(
        camera.position.x,
        defaultCameraPosition.current.x,
        INTERPOLATION_FACTOR
      );
      camera.position.y = MathUtils.lerp(
        camera.position.y,
        defaultCameraPosition.current.y,
        INTERPOLATION_FACTOR
      );
      camera.position.z = MathUtils.lerp(
        camera.position.z,
        defaultCameraPosition.current.z,
        INTERPOLATION_FACTOR
      );

      const TOLERANCE = 0.01;

      if (
        Math.abs(camera.position.x - defaultCameraPosition.current.x) <
          TOLERANCE &&
        Math.abs(camera.position.y - defaultCameraPosition.current.y) <
          TOLERANCE &&
        Math.abs(camera.position.z - defaultCameraPosition.current.z) <
          TOLERANCE
      ) {
        camera.position.set(
          defaultCameraPosition.current.x,
          defaultCameraPosition.current.y,
          defaultCameraPosition.current.z
        );

        setControlsMode("opened");
      }

      invalidate();
    }
  });
}
