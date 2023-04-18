import { useLayoutEffect, useRef } from "react";
import {
  MAIN_BOARD_HEIGHT,
  MAX_BOARD_HEIGHT,
} from "../_lib/constants/constants.js";

import type { Object3D, SpotLight } from "three";

// For Development
// import { useHelper } from "@react-three/drei";
// import { useControls } from "leva";
// import { SpotLightHelper } from "three";

export default function MainLight() {
  const spotLight = useRef<SpotLight>(null);
  const target = useRef<Object3D>(null);

  // Set spotLight target.
  useLayoutEffect(() => {
    if (!spotLight.current || !target.current) return;
    spotLight.current.target = target.current;
  }, []);

  // useHelper(spotLight, SpotLightHelper);

  // const { sIntensity, sY, sZ } = useControls("spotlight", {
  //   sIntensity: { value: 2, min: 0, max: 50, step: 0.1 },
  //   sY: { value: MAX_BOARD_HEIGHT / 2, min: -100, max: 100, step: 0.1 },
  //   sZ: { value: 12, min: -100, max: 100, step: 0.1 },
  // });

  // const { targetY, targetZ } = useControls("target", {
  //   targetY: {
  //     value: MAX_BOARD_HEIGHT - MAIN_BOARD_HEIGHT / 2,
  //     min: -100,
  //     max: 100,
  //     step: 0.1,
  //   },
  //   targetZ: { value: -MAX_BOARD_HEIGHT / 2, min: -100, max: 100, step: 0.1 },
  // });

  return (
    <>
      <spotLight
        ref={spotLight}
        intensity={2}
        position={[0, MAX_BOARD_HEIGHT / 2, 12]}
      />
      <object3D
        ref={target}
        position={[
          0,
          MAX_BOARD_HEIGHT - MAIN_BOARD_HEIGHT / 2,
          -MAX_BOARD_HEIGHT / 2,
        ]}
      />
    </>
  );
}
