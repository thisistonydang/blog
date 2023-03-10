import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import type { Points } from "three";

import ParticlesGeometry from "./ParticlesGeometry";
import ParticlesMaterial from "./ParticlesMaterial";

export default function Particles() {
  const particles = useRef<Points>(null);

  const { rotation } = useControls({
    rotation: { value: 0.1, min: -1, max: 1, step: 0.1 },
  });

  useFrame((_state, delta) => {
    if (particles.current) particles.current.rotation.y += delta * rotation;
  });

  return (
    <points ref={particles}>
      <ParticlesGeometry />
      <ParticlesMaterial />
    </points>
  );
}
