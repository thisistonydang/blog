import { Fragment, useMemo } from "react";
import { useControls } from "leva";
import { BufferAttribute } from "three";

export default function ParticlesGeometry() {
  const { count } = useControls({
    count: { value: 5000, min: 0, max: 9999, step: 1 },
  });

  const { positions_attr, scales_attr } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count * 1);

    for (let i = 0; i < count; i++) {
      // Set max_radius so that 75% of particles are in the center.
      const max_radius = i < 0.75 * count ? 0.1 : 1;
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

    const positions_attr = new BufferAttribute(positions, 3);
    const scales_attr = new BufferAttribute(scales, 1);

    return { positions_attr, scales_attr };
  }, [count]);

  return (
    <bufferGeometry>
      <Fragment key={count}>
        <bufferAttribute attach="attributes-position" {...positions_attr} />
        <bufferAttribute attach="attributes-a_scale" {...scales_attr} />
      </Fragment>
    </bufferGeometry>
  );
}
