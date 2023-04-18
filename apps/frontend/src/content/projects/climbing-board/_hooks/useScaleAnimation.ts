import { useFrame } from "@react-three/fiber";
import { MathUtils } from "three";

import type { Dispatch, RefObject, SetStateAction } from "react";
import type { Group } from "three";

export function useScaleAnimation(
  group: RefObject<Group>,
  setModelScaled: Dispatch<SetStateAction<boolean>>
) {
  const FINAL_SCALE = 1;
  const INTERPOLATION_FACTOR = 0.1;
  const TOLERANCE = 0.001;

  useFrame(({ invalidate }) => {
    if (
      group.current &&
      group.current.scale.x !== FINAL_SCALE &&
      group.current.scale.y !== FINAL_SCALE &&
      group.current.scale.z !== FINAL_SCALE
    ) {
      group.current.scale.x = MathUtils.lerp(
        group.current.scale.x,
        FINAL_SCALE,
        INTERPOLATION_FACTOR
      );
      group.current.scale.y = MathUtils.lerp(
        group.current.scale.y,
        FINAL_SCALE,
        INTERPOLATION_FACTOR
      );
      group.current.scale.z = MathUtils.lerp(
        group.current.scale.z,
        FINAL_SCALE,
        INTERPOLATION_FACTOR
      );

      if (
        Math.abs(group.current.scale.x - FINAL_SCALE) < TOLERANCE &&
        Math.abs(group.current.scale.y - FINAL_SCALE) < TOLERANCE &&
        Math.abs(group.current.scale.z - FINAL_SCALE) < TOLERANCE
      ) {
        group.current.scale.x = FINAL_SCALE;
        group.current.scale.y = FINAL_SCALE;
        group.current.scale.z = FINAL_SCALE;
        setModelScaled(true);
      }

      invalidate();
    }
  });
}
