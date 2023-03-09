import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";

import { AdditiveBlending } from "three";
import type { ShaderMaterial } from "three";

// @ts-expect-error svelte import
import { THEME_TOGGLED_EVENT } from "@layouts/page/_components/DarkModeToggle.svelte";
import { rgb_to_vec3 } from "@lib/colors/rgb_to_vec3";
// @ts-expect-error glsl import
import vertexShader from "@lib/shaders/particle/vertex.glsl";
// @ts-expect-error glsl import
import fragmentShader from "@lib/shaders/particle/fragment.glsl";

export default function ParticlesMaterial() {
  const particlesMaterial = useRef<ShaderMaterial>(null);

  const [{ size, oscillation, light_color, dark_color }, set] = useControls(
    () => ({
      size: { value: 150, min: 0, max: 300, step: 1 },
      oscillation: { value: 0.5, min: 0, max: 10, step: 0.1 },
      theme: {
        value: localStorage.theme === "dark" ? "dark" : "light",
        render: () => false,
      },
      light_color: {
        value: { r: 22, g: 78, b: 99 },
        render: (get) => get("theme") === "light",
      },
      dark_color: {
        value: { r: 103, g: 232, b: 249 },
        render: (get) => get("theme") === "dark",
      },
    })
  );

  useEffect(() => {
    function handle_theme_toggle() {
      if (
        particlesMaterial.current &&
        particlesMaterial.current.uniforms.u_color
      ) {
        particlesMaterial.current.uniforms.u_color.value = rgb_to_vec3(
          localStorage.theme === "dark" ? dark_color : light_color
        );
        set({ theme: localStorage.theme === "dark" ? "dark" : "light" });
      }
    }

    window.addEventListener(THEME_TOGGLED_EVENT, handle_theme_toggle);

    return () =>
      window.removeEventListener(THEME_TOGGLED_EVENT, handle_theme_toggle);
  }, [dark_color, light_color, set]);

  useFrame((_state, delta) => {
    if (
      particlesMaterial.current &&
      particlesMaterial.current.uniforms.u_elapsed_time
    ) {
      particlesMaterial.current.uniforms.u_elapsed_time.value +=
        delta * oscillation;
    }
  });

  return (
    <shaderMaterial
      key={Math.random()}
      ref={particlesMaterial}
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
      uniforms={{
        u_elapsed_time: { value: 0 },
        u_pixel_ratio: { value: Math.min(devicePixelRatio, 2) },
        u_particle_size: { value: size },
        u_color: {
          value: rgb_to_vec3(
            localStorage.theme === "dark" ? dark_color : light_color
          ),
        },
      }}
      transparent={true}
      depthWrite={false}
      blending={AdditiveBlending}
    />
  );
}
