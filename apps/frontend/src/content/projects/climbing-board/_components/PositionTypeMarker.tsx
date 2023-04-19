import { useLayoutEffect, useRef } from "react";
import { Color, Matrix4, MeshBasicMaterial, RingGeometry } from "three";

import { ALPHABET, BOARD_THICKNESS } from "../_lib/constants/constants.js";

import type { InstancedMesh } from "three";
import type { Hold } from "../_lib/types/Hold";

const matrix4 = new Matrix4();
const color = new Color();
const material = new MeshBasicMaterial();

export default function PositionTypeMarker({
  geometry,
  rotation,
  markerColor,
  holds,
  xStart,
  yStart,
}: {
  geometry: RingGeometry;
  rotation: number;
  markerColor: string;
  holds: Hold[];
  xStart: number;
  yStart: number;
}) {
  const instancedMesh = useRef<InstancedMesh>(null);

  useLayoutEffect(() => {
    holds.forEach((hold, index) => {
      if (!instancedMesh.current) return;

      function isEven(n: number): boolean {
        return n % 2 === 0;
      }

      let zOffset;
      if (isEven(ALPHABET.indexOf(hold.column))) {
        zOffset = isEven(hold.row) ? 0.001 : 0.002;
      } else {
        zOffset = isEven(hold.row) ? 0.003 : 0.004;
      }

      matrix4.makeRotationZ(rotation);
      matrix4.setPosition(
        xStart + hold.xOffset,
        yStart + hold.yOffset,
        BOARD_THICKNESS / 2 + zOffset
      );
      instancedMesh.current.setMatrixAt(index, matrix4);
      instancedMesh.current.instanceMatrix.needsUpdate = true;

      instancedMesh.current.setColorAt(index, color.set(`#${markerColor}`));
      if (instancedMesh.current.instanceColor) {
        instancedMesh.current.instanceColor.needsUpdate = true;
      }
    });
  }, [markerColor, holds, xStart, yStart, rotation]);

  return (
    <instancedMesh
      ref={instancedMesh}
      args={[geometry, material, holds.length]}
    ></instancedMesh>
  );
}
