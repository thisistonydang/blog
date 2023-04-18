import { useFrame } from "@react-three/fiber";
import { MathUtils } from "three";

import type { Dispatch, RefObject, SetStateAction } from "react";
import type { Group } from "three";

export function useRotationAnimation(
  group: RefObject<Group>,
  setModelRotated: Dispatch<SetStateAction<boolean>>
) {
  const FINAL_ROTATION = 2 * Math.PI * 3; // Three full rotations
  const INTERPOLATION_FACTOR = 0.1;
  const TOLERANCE = 0.001;

  useFrame(({ invalidate }) => {
    if (group.current && group.current.rotation.y !== FINAL_ROTATION) {
      group.current.rotation.y = MathUtils.lerp(
        group.current.rotation.y,
        FINAL_ROTATION,
        INTERPOLATION_FACTOR
      );

      if (Math.abs(group.current.rotation.y - FINAL_ROTATION) < TOLERANCE) {
        group.current.rotation.y = FINAL_ROTATION;
        setModelRotated(true);
      }

      invalidate();
    }
  });
}
