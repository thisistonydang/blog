import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { MathUtils } from "three";

import { planeGeometry } from "../_lib/geometries/planeGeometry";

import type { ShadowMaterial } from "three";

export default function ShadowPlane({
  introAnimationCompleted,
}: {
  introAnimationCompleted: boolean;
}) {
  const material = useRef<ShadowMaterial>(null);

  useFrame(({ invalidate }) => {
    if (!material.current) return;

    const FINAL_OPACITY = 1;
    const INTERPOLATION_FACTOR = 0.025;

    if (introAnimationCompleted && material.current.opacity !== FINAL_OPACITY) {
      material.current.opacity = MathUtils.lerp(
        material.current.opacity,
        FINAL_OPACITY,
        INTERPOLATION_FACTOR
      );

      const TOLERANCE = 0.001;

      if (Math.abs(material.current.opacity - FINAL_OPACITY) < TOLERANCE) {
        material.current.opacity = FINAL_OPACITY;
      }

      invalidate();
    }
  });

  return (
    <mesh
      geometry={planeGeometry}
      rotation={[-Math.PI * 0.5, 0, 0]}
      position={[0, -1, 0]}
      scale={[30, 30, 1]}
      receiveShadow
    >
      <shadowMaterial ref={material} transparent={true} opacity={0} />
    </mesh>
  );
}
