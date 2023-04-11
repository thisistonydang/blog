import { RoundedBox } from "@react-three/drei";
import { useContext } from "react";

import { BoardWidthContext } from "../_context/BoardWidthContext";
import { MAX_BOARD_HEIGHT } from "../_lib/constants/constants.js";

// Dev
// import { useControls } from "leva";

export default function CrashPad() {
  const { boardWidth } = useContext(BoardWidthContext);
  const CRASH_PAD_HEIGHT = 10 / 12;

  // const { height, radius } = useControls("pad", {
  //   height: { value: 10 / 12, min: 0, max: 15, step: 0.01 },
  //   radius: { value: 0.4, min: 0, max: 0.5, step: 0.01 },
  // });

  return (
    <RoundedBox
      args={[boardWidth + 8, CRASH_PAD_HEIGHT, MAX_BOARD_HEIGHT]}
      radius={0.4}
      position={[0, CRASH_PAD_HEIGHT / 2, 0]}
    >
      <meshStandardMaterial color="#000000" />
    </RoundedBox>
  );
}
