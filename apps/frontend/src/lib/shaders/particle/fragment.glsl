varying float v_mix_percentage;

void main() {
  // Set color depending on whether theme is in light or dark mode.
  vec3 light_accent_color = vec3(22.0 / 255.0, 78.0 / 255.0, 99.0 / 255.0);
  vec3 dark_accent_color = vec3(103.0 / 255.0, 232.0 / 255.0, 249.0 / 255.0);
  vec3 color = mix(light_accent_color, dark_accent_color, v_mix_percentage);

  // Calculate alpha so that particle is brightest in the center and rapidly
  // drops in brightness away from the center.
  float distance_to_center = distance(gl_PointCoord, vec2(0.5));
  float alpha = 0.05 / distance_to_center - 0.05 * 5.0;

  gl_FragColor = vec4(color, alpha);
}
