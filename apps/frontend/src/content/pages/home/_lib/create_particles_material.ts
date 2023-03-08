import { AdditiveBlending, ShaderMaterial } from "three";
import type { Controls } from "../_types/Controls";

// @ts-expect-error svelte import
import { THEME_TOGGLED_EVENT } from "@layouts/page/_components/DarkModeToggle.svelte";
import { rgb_to_vec3 } from "@lib/colors/rgb_to_vec3";
// @ts-expect-error glsl import
import vertexShader from "@lib/shaders/particle/vertex.glsl";
// @ts-expect-error glsl import
import fragmentShader from "@lib/shaders/particle/fragment.glsl";

export function create_particles_material(controls: Controls): ShaderMaterial {
  const material = new ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      u_elapsed_time: { value: 0 },
      u_pixel_ratio: { value: Math.min(devicePixelRatio, 2) },
      u_particle_size: { value: controls.size },
      u_color: {
        value: rgb_to_vec3(
          localStorage.theme === "dark"
            ? controls.dark_color
            : controls.light_color
        ),
      },
    },
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
  });

  window.addEventListener("resize", () => {
    const u_pixel_ratio = material.uniforms.u_pixel_ratio;
    if (u_pixel_ratio) u_pixel_ratio.value = Math.min(devicePixelRatio, 2);
  });

  window.addEventListener(THEME_TOGGLED_EVENT, () => {
    const u_color = material.uniforms.u_color;
    if (u_color)
      u_color.value = rgb_to_vec3(
        localStorage.theme === "dark"
          ? controls.dark_color
          : controls.light_color
      );
  });

  return material;
}
