import { RoundedBox } from "@react-three/drei";
import { useContext } from "react";

import { BoardWidthContext } from "../_context/BoardWidthContext";
import {
  CRASH_PAD_DEPTH,
  MAX_BOARD_HEIGHT,
} from "../_lib/constants/constants.js";

export default function CrashPad() {
  const { boardWidth } = useContext(BoardWidthContext);
  const CRASH_PAD_HEIGHT = MAX_BOARD_HEIGHT / 12; // 1" per feet of max height

  return (
    <RoundedBox
      args={[boardWidth + 8, CRASH_PAD_HEIGHT, CRASH_PAD_DEPTH]}
      radius={0.6}
      position={[0, CRASH_PAD_HEIGHT / 2, 0]}
    >
      <meshStandardMaterial color="#000000" />
    </RoundedBox>
  );
}
