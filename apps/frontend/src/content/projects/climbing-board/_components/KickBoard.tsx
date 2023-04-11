import { useContext } from "react";

import { BoardWidthContext } from "../_context/BoardWidthContext";

import {
  BOARD_THICKNESS,
  BOARD_TO_PAD_GAP,
  MAIN_BOARD_HEIGHT,
  MAX_BOARD_HEIGHT,
} from "../_lib/constants/constants.js";
import { boxGeometry } from "../_lib/geometries";
import { boardMaterial } from "../_lib/materials";

export default function KickBoard() {
  const { boardWidth } = useContext(BoardWidthContext);

  return (
    <mesh
      geometry={boxGeometry}
      material={boardMaterial}
      scale={[
        boardWidth,
        MAX_BOARD_HEIGHT - MAIN_BOARD_HEIGHT,
        BOARD_THICKNESS,
      ]}
      position={[
        0,
        (MAX_BOARD_HEIGHT - MAIN_BOARD_HEIGHT) / 2,
        -MAX_BOARD_HEIGHT / 2 - BOARD_TO_PAD_GAP,
      ]}
    ></mesh>
  );
}
