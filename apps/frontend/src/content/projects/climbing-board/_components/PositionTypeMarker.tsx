import { useLayoutEffect, useRef } from "react";
import { Euler, Matrix4, Vector3 } from "three";

import { BOARD_THICKNESS } from "../_lib/constants/constants.js";

import type { InstancedMesh } from "three";
import type { Hold } from "../_lib/types/Hold";

const euler = new Euler();
const vector3 = new Vector3();
const matrix4 = new Matrix4();

export default function PositionTypeMarker({
  holds,
  xStart,
  yStart,
  color,
  rotation,
  segments,
}: {
  holds: Hold[];
  xStart: number;
  yStart: number;
  color: string;
  rotation: number;
  segments: number;
}) {
  const instancedMesh = useRef<InstancedMesh>(null);

  useLayoutEffect(() => {
    holds.forEach((hold, index) => {
      if (!instancedMesh.current) return;

      euler.set(0, 0, rotation);
      vector3.set(
        xStart + hold.xOffset,
        yStart + hold.yOffset,
        BOARD_THICKNESS / 2 + 0.001
      );
      matrix4.makeRotationFromEuler(euler);
      matrix4.setPosition(vector3);
      instancedMesh.current.setMatrixAt(index, matrix4);
      instancedMesh.current.instanceMatrix.needsUpdate = true;
    });
  }, [holds, xStart, yStart, rotation]);

  return (
    <instancedMesh
      ref={instancedMesh}
      args={[undefined, undefined, holds.length]}
    >
      <ringGeometry args={[0.3, 0.4, segments]} />
      <meshBasicMaterial color={`#${color}`} />
    </instancedMesh>
  );
}
