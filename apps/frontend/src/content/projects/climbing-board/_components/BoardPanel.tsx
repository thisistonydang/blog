import { useContext } from "react";

import { BoardWidthContext } from "../_context/BoardWidthContext";

import { BOARD_THICKNESS } from "../_lib/constants/constants.js";
import { BOX_GEOMETRY_SCALE, boxGeometry } from "../_lib/geometries";
import { boardMaterial } from "../_lib/materials";

export default function BoardPanel({ height }: { height: number }) {
  const { boardWidth } = useContext(BoardWidthContext);

  return (
    <mesh
      geometry={boxGeometry}
      material={boardMaterial}
      scale={[
        boardWidth * BOX_GEOMETRY_SCALE,
        height * BOX_GEOMETRY_SCALE,
        BOARD_THICKNESS * BOX_GEOMETRY_SCALE,
      ]}
    ></mesh>
  );
}
