import { useTexture } from "@react-three/drei";
import { BufferGeometryNode, extend } from "@react-three/fiber";
import { useContext } from "react";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry";

import { BoardWidthContext } from "../_context/BoardWidthContext";
import {
  CRASH_PAD_DEPTH,
  CRASH_PAD_HEIGHT,
  CRASH_PAD_PADDING,
} from "../_lib/constants/constants.js";
import { padAndNutMaterial } from "../_lib/materials/padAndNutMaterial";

extend({ RoundedBoxGeometry });

declare module "@react-three/fiber" {
  interface ThreeElements {
    roundedBoxGeometry: BufferGeometryNode<
      RoundedBoxGeometry,
      typeof RoundedBoxGeometry
    >;
  }
}

export default function CrashPad() {
  const { boardWidth } = useContext(BoardWidthContext);
  const matcap = useTexture("/matcaps/64/1B1B1B_999999_575757_747474-64px.png");

  return (
    <mesh
      material={padAndNutMaterial}
      material-matcap={matcap}
      position={[0, CRASH_PAD_HEIGHT / 2, 0]}
      castShadow
    >
      <roundedBoxGeometry
        args={[
          boardWidth + 2 * CRASH_PAD_PADDING,
          CRASH_PAD_HEIGHT,
          CRASH_PAD_DEPTH,
          1,
        ]}
      />
    </mesh>
  );
}
