uniform vec3 u_color;

void main() {
  // Calculate alpha so that particle is brightest in the center and rapidly
  // drops in brightness away from the center.
  float distance_to_center = distance(gl_PointCoord, vec2(0.5));
  float alpha = 0.05 / distance_to_center - 0.05 * 5.0;

  gl_FragColor = vec4(u_color, alpha);
}
