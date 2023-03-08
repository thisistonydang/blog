import { Points } from "three";
import { create_particles_geometry } from "./create_particles_geometry";
import { create_particles_material } from "./create_particles_material";

import type { ShaderMaterial } from "three";
import type { Controls } from "../_types/Controls";

export function create_particles(controls: Controls): {
  points: Points;
  material: ShaderMaterial;
} {
  const geometry = create_particles_geometry(controls);
  const material = create_particles_material(controls);

  return {
    points: new Points(geometry, material),
    material,
  };
}
