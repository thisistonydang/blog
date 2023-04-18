import { useFrame } from "@react-three/fiber";
import { useContext } from "react";
import { MathUtils } from "three";

import { ControlsModeContext } from "../_context/ControlsModeContext";

import type { RefObject } from "react";
import type { Group } from "three";

export function useBoardTransitioningFromOpenedAnimation(
  group: RefObject<Group>
) {
  const { controlsMode } = useContext(ControlsModeContext);

  useFrame(({ invalidate }) => {
    if (!group.current) return;

    const FINAL_BOARD_ANGLE = 0;
    const INTERPOLATION_FACTOR = 0.1;

    if (
      controlsMode === "transitioning_to_browse" ||
      controlsMode === "transitioning_to_edit"
    ) {
      group.current.rotation.x = MathUtils.lerp(
        group.current.rotation.x,
        FINAL_BOARD_ANGLE,
        INTERPOLATION_FACTOR
      );

      invalidate();
    }

    if (
      (controlsMode === "browse" || controlsMode === "edit") &&
      group.current.rotation.x !== FINAL_BOARD_ANGLE
    ) {
      group.current.rotation.x = FINAL_BOARD_ANGLE;
    }
  });
}
