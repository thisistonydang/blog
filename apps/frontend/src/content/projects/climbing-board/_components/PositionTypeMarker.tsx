import { useLayoutEffect, useRef } from "react";
import { Matrix4, RingGeometry } from "three";

import { BOARD_THICKNESS } from "../_lib/constants/constants.js";
import { ringGeometry } from "../_lib/geometries/ringGeometry.js";

import type { InstancedMesh } from "three";
import type { Hold } from "../_lib/types/Hold";

const matrix4 = new Matrix4();
const triangleRingGeometry = new RingGeometry(0.3, 0.4, 3);
const squareRingGeometry = new RingGeometry(0.3, 0.4, 4);

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

  const geometry =
    segments === 3
      ? triangleRingGeometry
      : segments === 4
      ? squareRingGeometry
      : ringGeometry;

  useLayoutEffect(() => {
    holds.forEach((hold, index) => {
      if (!instancedMesh.current) return;

      matrix4.makeRotationZ(rotation);
      matrix4.setPosition(
        xStart + hold.xOffset,
        yStart + hold.yOffset,
        BOARD_THICKNESS / 2 + 0.001
      );
      instancedMesh.current.setMatrixAt(index, matrix4);
      instancedMesh.current.instanceMatrix.needsUpdate = true;
    });
  }, [holds, xStart, yStart, rotation]);

  return (
    <instancedMesh
      ref={instancedMesh}
      args={[geometry, undefined, holds.length]}
    >
      <meshBasicMaterial color={`#${color}`} />
    </instancedMesh>
  );
}
