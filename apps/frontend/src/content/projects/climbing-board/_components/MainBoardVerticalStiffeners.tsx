import { useTexture } from "@react-three/drei";
import { useContext, useLayoutEffect, useRef } from "react";
import { Matrix4, Shape } from "three";

import { BoardWidthContext } from "../_context/BoardWidthContext";
import {
  BOARD_THICKNESS,
  HORIZONTAL_STIFFENER_SIZE,
  MAIN_BOARD_HEIGHT,
} from "../_lib/constants/constants.js";

import type { InstancedMesh } from "three";

const matrix4 = new Matrix4();

// Create shape for extrudeGeometry
const shape = new Shape();
const stiffenerWidth = 1;
const bigChamfer = 4;
shape.moveTo(0, 0);
shape.lineTo(0, MAIN_BOARD_HEIGHT);
shape.lineTo(HORIZONTAL_STIFFENER_SIZE, MAIN_BOARD_HEIGHT);
shape.lineTo(
  HORIZONTAL_STIFFENER_SIZE,
  MAIN_BOARD_HEIGHT - HORIZONTAL_STIFFENER_SIZE
);
shape.lineTo(stiffenerWidth, MAIN_BOARD_HEIGHT - bigChamfer);
shape.lineTo(stiffenerWidth, bigChamfer);
shape.lineTo(HORIZONTAL_STIFFENER_SIZE, HORIZONTAL_STIFFENER_SIZE);
shape.lineTo(HORIZONTAL_STIFFENER_SIZE, 0);
shape.lineTo(0, 0);

export default function MainBoardVerticalStiffeners() {
  const { boardWidth } = useContext(BoardWidthContext);
  const instancedMesh = useRef<InstancedMesh>(null);
  const matcap = useTexture("/matcaps/64/3B3B3B_C7C7C7_878787_A4A4A4-64px.png");
  const STIFFENERS_COUNT = 2;

  useLayoutEffect(() => {
    if (!instancedMesh.current) return;

    for (let i = 0; i < STIFFENERS_COUNT; i++) {
      const positionX =
        i === 0 ? boardWidth / 2 - BOARD_THICKNESS : -boardWidth / 2;

      matrix4.makeRotationY(Math.PI * 0.5);
      matrix4.setPosition(positionX, 0, -BOARD_THICKNESS / 2);
      instancedMesh.current.setMatrixAt(i, matrix4);
      instancedMesh.current.instanceMatrix.needsUpdate = true;
    }
  }, [boardWidth]);

  return (
    <instancedMesh
      ref={instancedMesh}
      args={[undefined, undefined, STIFFENERS_COUNT]}
    >
      <extrudeGeometry
        args={[
          shape,
          {
            depth: BOARD_THICKNESS,
            bevelEnabled: false,
          },
        ]}
      />
      <meshMatcapMaterial matcap={matcap} />
    </instancedMesh>
  );
}
