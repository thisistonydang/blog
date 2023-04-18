import { RoundedBox, useTexture } from "@react-three/drei";
import { useContext } from "react";

import { BoardWidthContext } from "../_context/BoardWidthContext";
import {
  CRASH_PAD_DEPTH,
  CRASH_PAD_HEIGHT,
} from "../_lib/constants/constants.js";
import { padAndNutMaterial } from "../_lib/materials/padAndNutMaterial";

export default function CrashPad() {
  const { boardWidth } = useContext(BoardWidthContext);
  const matcap = useTexture("/matcaps/64/1B1B1B_999999_575757_747474-64px.png");

  return (
    <RoundedBox
      args={[boardWidth + 8, CRASH_PAD_HEIGHT, CRASH_PAD_DEPTH]}
      radius={0.2}
      material={padAndNutMaterial}
      material-matcap={matcap}
      position={[0, CRASH_PAD_HEIGHT / 2, 0]}
      castShadow
    ></RoundedBox>
  );
}
