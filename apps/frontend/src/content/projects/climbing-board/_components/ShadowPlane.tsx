import { useFrame } from "@react-three/fiber";
import { MathUtils, ShadowMaterial } from "three";

import { planeGeometry } from "../_lib/geometries/planeGeometry";

const material = new ShadowMaterial({
  transparent: true,
  opacity: 0,
});

export default function ShadowPlane({
  introAnimationCompleted,
}: {
  introAnimationCompleted: boolean;
}) {
  useFrame(({ invalidate }) => {
    const FINAL_OPACITY = 1;
    const INTERPOLATION_FACTOR = 0.025;

    if (introAnimationCompleted && material.opacity !== FINAL_OPACITY) {
      material.opacity = MathUtils.lerp(
        material.opacity,
        FINAL_OPACITY,
        INTERPOLATION_FACTOR
      );

      const TOLERANCE = 0.001;

      if (Math.abs(material.opacity - FINAL_OPACITY) < TOLERANCE) {
        material.opacity = FINAL_OPACITY;
      }

      invalidate();
    }
  });

  return (
    <mesh
      geometry={planeGeometry}
      material={material}
      rotation={[-Math.PI * 0.5, 0, 0]}
      position={[0, -1, 0]}
      scale={[30, 30, 1]}
      receiveShadow
    ></mesh>
  );
}
