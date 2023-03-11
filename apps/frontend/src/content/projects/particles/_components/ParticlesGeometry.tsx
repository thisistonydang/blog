import { useControls } from "leva";

const MAX_COUNT = 9999;
const positions = new Float32Array(MAX_COUNT * 3);
const scales = new Float32Array(MAX_COUNT * 1);

for (let i = 0; i < MAX_COUNT; i++) {
  // Set max_radius so that every 3rd particle is in the center nucleus.
  const max_radius = i % 3 !== 0 ? 0.1 : 1;
  const radius = Math.random() * max_radius;

  const a = Math.random() - 0.5;
  const b = Math.random() - 0.5;
  const c = Math.random() - 0.5;
  const d = Math.sqrt(a ** 2 + b ** 2 + c ** 2);

  positions[i * 3 + 0] = (a / d) * radius;
  positions[i * 3 + 1] = (b / d) * radius;
  positions[i * 3 + 2] = (c / d) * radius;

  scales[i] = Math.random();
}

export default function ParticlesGeometry() {
  const { count } = useControls({
    count: { value: 5000, min: 0, max: MAX_COUNT, step: 1 },
  });

  return (
    <bufferGeometry>
      <bufferAttribute
        attach="attributes-position"
        args={[positions, 3]}
        count={count}
      />
      <bufferAttribute
        attach="attributes-a_scale"
        args={[scales, 1]}
        count={count}
      />
    </bufferGeometry>
  );
}
