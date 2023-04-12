import { useFrame } from "@react-three/fiber";
import { MathUtils } from "three";

import type { RefObject } from "react";
import type { Group } from "three";

export function useScaleAnimation(group: RefObject<Group>) {
  useFrame(({ invalidate }) => {
    const FINAL_SCALE = 1;
    const INTERPOLATION_FACTOR = 0.1;

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

      const TOLERANCE = 0.001;

      if (
        Math.abs(group.current.scale.x - FINAL_SCALE) < TOLERANCE &&
        Math.abs(group.current.scale.y - FINAL_SCALE) < TOLERANCE &&
        Math.abs(group.current.scale.z - FINAL_SCALE) < TOLERANCE
      ) {
        group.current.scale.x = FINAL_SCALE;
        group.current.scale.y = FINAL_SCALE;
        group.current.scale.z = FINAL_SCALE;
      }

      invalidate();
    }
  });
}
