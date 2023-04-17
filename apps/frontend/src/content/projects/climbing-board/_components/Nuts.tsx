import { useTexture } from "@react-three/drei";
import { useLayoutEffect, useRef } from "react";
import { Matrix4 } from "three";

import { BOARD_THICKNESS } from "../_lib/constants/constants.js";

import type { InstancedMesh } from "three";
import type { Hold } from "../_lib/types/Hold";

const matrix4 = new Matrix4();

export default function Nuts({
  holds,
  xStart,
  yStart,
}: {
  holds: Hold[];
  xStart: number;
  yStart: number;
}) {
  const matcap = useTexture("/matcaps/64/1B1B1B_999999_575757_747474-64px.png");
  const instancedMesh = useRef<InstancedMesh>(null);
  const NUT_HEIGHT = 0.5 / 12;

  useLayoutEffect(() => {
    holds.forEach((hold, index) => {
      if (!instancedMesh.current) return;

      matrix4.makeRotationX(-Math.PI * 0.5);
      matrix4.setPosition(
        xStart + hold.xOffset,
        yStart + hold.yOffset,
        -NUT_HEIGHT / 2 - BOARD_THICKNESS / 2
      );
      instancedMesh.current.setMatrixAt(index, matrix4);
      instancedMesh.current.instanceMatrix.needsUpdate = true;
    });
  }, [NUT_HEIGHT, holds, xStart, yStart]);

  return (
    <instancedMesh
      ref={instancedMesh}
      args={[undefined, undefined, holds.length]}
    >
      <cylinderGeometry args={[0.5 / 12, 0.5 / 12, NUT_HEIGHT, 6]} />
      <meshMatcapMaterial matcap={matcap} />
    </instancedMesh>
  );
}
