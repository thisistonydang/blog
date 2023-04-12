import { useFrame } from "@react-three/fiber";
import { MathUtils } from "three";

import type { RefObject } from "react";
import type { Group } from "three";

export function useRotationAnimation(group: RefObject<Group>) {
  useFrame(({ invalidate }) => {
    const FINAL_ROTATION = 2 * Math.PI * 3; // Three full rotations
    const INTERPOLATION_FACTOR = 0.1;

    if (group.current && group.current.rotation.y !== FINAL_ROTATION) {
      group.current.rotation.y = MathUtils.lerp(
        group.current.rotation.y,
        FINAL_ROTATION,
        INTERPOLATION_FACTOR
      );

      const TOLERANCE = 0.001;

      if (Math.abs(group.current.rotation.y - FINAL_ROTATION) < TOLERANCE) {
        group.current.rotation.y = FINAL_ROTATION;
      }

      invalidate();
    }
  });
}
