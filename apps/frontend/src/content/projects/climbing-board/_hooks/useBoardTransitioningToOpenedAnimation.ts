import { useFrame } from "@react-three/fiber";
import { useContext } from "react";
import { MathUtils } from "three";

import { BoardAngleContext } from "../_context/BoardAngleContext";
import { ControlsModeContext } from "../_context/ControlsModeContext";

import type { RefObject } from "react";
import type { Group } from "three";

export function useBoardTransitioningToOpenedAnimation(
  mainBoard: RefObject<Group>
) {
  const { boardAngle } = useContext(BoardAngleContext);
  const { controlsMode } = useContext(ControlsModeContext);

  useFrame(({ invalidate }) => {
    if (!mainBoard.current) return;

    const FINAL_BOARD_ANGLE = MathUtils.degToRad(boardAngle);
    const INTERPOLATION_FACTOR = 0.1;

    if (controlsMode === "transitioning_to_opened") {
      mainBoard.current.rotation.x = MathUtils.lerp(
        mainBoard.current.rotation.x,
        FINAL_BOARD_ANGLE,
        INTERPOLATION_FACTOR
      );

      invalidate();
    }

    if (controlsMode === "opened") {
      mainBoard.current.rotation.x = FINAL_BOARD_ANGLE;
    }
  });
}
