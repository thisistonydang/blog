import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { PerspectiveCamera } from "three";

import { ALLOWED_WIDTHS } from "../_context/BoardWidthContext";
import {
  DEFAULT_CAMERA_FOV,
  MAX_BOARD_HEIGHT,
} from "../_lib/constants/constants";
import { resizeFov } from "../_lib/three/resizeFov";

export function useFovResizer() {
  const { camera } = useThree();

  // Update FOV on resize events.
  useEffect(() => {
    function setFov() {
      const MAX_BOARD_WIDTH = ALLOWED_WIDTHS.at(-1);
      if (!(camera instanceof PerspectiveCamera) || !MAX_BOARD_WIDTH) return;

      resizeFov(
        camera,
        DEFAULT_CAMERA_FOV,
        MAX_BOARD_WIDTH / MAX_BOARD_HEIGHT // minAspectRatio
      );
    }

    setFov(); // Set FOV on mount.
    window.addEventListener("resize", setFov);

    return () => window.removeEventListener("resize", setFov);
  }, [camera]);
}
