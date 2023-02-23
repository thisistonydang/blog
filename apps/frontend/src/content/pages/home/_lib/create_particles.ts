import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Points,
  ShaderMaterial,
} from "three";
import vertexShader from "../_shaders/particle/vertex.glsl";
import fragmentShader from "../_shaders/particle/fragment.glsl";

export function create_particles(): {
  points: Points;
  material: ShaderMaterial;
} {
  /**
   * Geometry
   */
  const geometry = new BufferGeometry();
  const particle_count = 100;

  const positions = new Float32Array(particle_count * 3);
  const scales = new Float32Array(particle_count * 1);

  for (let i = 0; i < particle_count; i++) {
    positions[i * 3 + 0] = Math.random() - 0.5;
    positions[i * 3 + 1] = Math.random() - 0.5;
    positions[i * 3 + 2] = Math.random() - 0.5;
    scales[i] = Math.random();
  }

  geometry.setAttribute("position", new BufferAttribute(positions, 3));
  geometry.setAttribute("a_scale", new BufferAttribute(scales, 1));

  /**
   * Material
   */
  const material = new ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      u_elapsed_time: { value: 0 },
      u_pixel_ratio: { value: Math.min(devicePixelRatio, 2) },
      u_mix_percentage: { value: localStorage.theme === "dark" ? 1 : 0 },
    },
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
  });

  addEventListener("resize", () => {
    const u_pixel_ratio = material.uniforms.u_pixel_ratio;
    if (u_pixel_ratio) u_pixel_ratio.value = Math.min(devicePixelRatio, 2);
  });

  addEventListener("theme-toggled", () => {
    const u_mix_percentage = material.uniforms.u_mix_percentage;
    if (u_mix_percentage)
      u_mix_percentage.value = localStorage.theme === "dark" ? 1 : 0;
  });

  return {
    points: new Points(geometry, material),
    material,
  };
}
