import { useContext, useRef } from "react";
import { MathUtils } from "three";

import { BoardAngleContext } from "../_context/BoardAngleContext";
import {
  BOARD_TO_PAD_GAP,
  CRASH_PAD_DEPTH,
  KICK_BOARD_HEIGHT,
} from "../_lib/constants/constants.js";
import { useBoardTransitioningFromOpenedAnimation } from "../_hooks/useBoardTransitioningFromOpenedAnimation";
import { useBoardTransitioningToOpenedAnimation } from "../_hooks/useBoardTransitioningToOpenedAnimation";

import MainBoardHorizonalStiffeners from "./MainBoardHorzontalStiffeners";
import MainBoardPanelGroup from "./MainBoardPanelGroup";
import MainBoardVerticalStiffeners from "./MainBoardVerticalStiffeners";

import type { Group } from "three";

export default function MainBoardRotationGroup() {
  const { boardAngle } = useContext(BoardAngleContext);
  const mainBoardRotationGroup = useRef<Group>(null);

  useBoardTransitioningFromOpenedAnimation(mainBoardRotationGroup);
  useBoardTransitioningToOpenedAnimation(mainBoardRotationGroup);

  return (
    <group
      ref={mainBoardRotationGroup}
      position={[
        0,
        KICK_BOARD_HEIGHT + 0.1,
        -CRASH_PAD_DEPTH / 2 - BOARD_TO_PAD_GAP,
      ]}
      rotation={[MathUtils.degToRad(boardAngle), 0, 0]}
    >
      <MainBoardPanelGroup />
      <MainBoardVerticalStiffeners />
      <MainBoardHorizonalStiffeners />
    </group>
  );
}
