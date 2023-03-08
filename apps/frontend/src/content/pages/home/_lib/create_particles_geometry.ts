import { BufferAttribute, BufferGeometry } from "three";
import type { Controls } from "../_types/Controls";

export function create_particles_geometry(controls: Controls): BufferGeometry {
  const geometry = new BufferGeometry();

  const positions = new Float32Array(controls.count * 3);
  const scales = new Float32Array(controls.count * 1);

  for (let i = 0; i < controls.count; i++) {
    // Set max_radius so that 75% of particles are in the center.
    const max_radius = i < 0.75 * controls.count ? 0.1 : 1;
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

  geometry.setAttribute("position", new BufferAttribute(positions, 3));
  geometry.setAttribute("a_scale", new BufferAttribute(scales, 1));

  return geometry;
}
