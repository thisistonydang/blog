import { useContext, useLayoutEffect, useRef } from "react";
import { Matrix4 } from "three";

import {
  BOARD_THICKNESS,
  HORIZONTAL_STIFFENER_SIZE,
  KICK_BOARD_HEIGHT,
} from "../_lib/constants/constants.js";
import { BoardWidthContext } from "../_context/BoardWidthContext";
import { boxGeometry } from "../_lib/geometries/boxGeometry";
import { boardMaterial } from "../_lib/materials/boardMaterial";

import type { InstancedMesh } from "three";

const matrix4 = new Matrix4();

export default function KickBoardVerticalStiffeners() {
  const { boardWidth } = useContext(BoardWidthContext);
  const instancedMesh = useRef<InstancedMesh>(null);
  const STIFFENERS_COUNT = 2;

  useLayoutEffect(() => {
    if (!instancedMesh.current) return;

    for (let i = 0; i < STIFFENERS_COUNT; i++) {
      const positionX =
        i === 0
          ? boardWidth / 2 - BOARD_THICKNESS / 2
          : -boardWidth / 2 + BOARD_THICKNESS / 2;

      matrix4.makeScale(
        BOARD_THICKNESS,
        KICK_BOARD_HEIGHT,
        HORIZONTAL_STIFFENER_SIZE
      );
      matrix4.setPosition(
        positionX,
        0,
        -HORIZONTAL_STIFFENER_SIZE / 2 - BOARD_THICKNESS / 2
      );
      instancedMesh.current.setMatrixAt(i, matrix4);
      instancedMesh.current.instanceMatrix.needsUpdate = true;
    }
  }, [boardWidth]);

  return (
    <instancedMesh
      ref={instancedMesh}
      args={[boxGeometry, boardMaterial, STIFFENERS_COUNT]}
    ></instancedMesh>
  );
}
