import { useTexture } from "@react-three/drei";
import { useContext } from "react";

import { BoardWidthContext } from "../_context/BoardWidthContext";

import { BOARD_THICKNESS } from "../_lib/constants/constants.js";
import { BOX_GEOMETRY_SCALE, boxGeometry } from "../_lib/geometries";

export default function BoardPanel({ height }: { height: number }) {
  const { boardWidth } = useContext(BoardWidthContext);
  const matcap = useTexture("/matcaps/64/3B3B3B_C7C7C7_878787_A4A4A4-64px.png");

  return (
    <mesh
      geometry={boxGeometry}
      scale={[
        boardWidth * BOX_GEOMETRY_SCALE,
        height * BOX_GEOMETRY_SCALE,
        BOARD_THICKNESS * BOX_GEOMETRY_SCALE,
      ]}
    >
      <meshMatcapMaterial matcap={matcap} />
    </mesh>
  );
}
