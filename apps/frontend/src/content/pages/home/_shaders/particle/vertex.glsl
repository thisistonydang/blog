uniform float u_elapsed_time;
uniform float u_pixel_ratio;

attribute float a_scale;

void main() {
  /**
 * Particle position
 */
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  // Oscillate particles randomly on all axes.
  float amplitude = 0.05;
  modelPosition.x += sin(u_elapsed_time + a_scale * 25.0) * amplitude;
  modelPosition.y += sin(u_elapsed_time + a_scale * 50.0) * amplitude;
  modelPosition.z += sin(u_elapsed_time + a_scale * 100.0) * amplitude;

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectionPosition = projectionMatrix * viewPosition;

  gl_Position = projectionPosition;

  /**
 * Particle size
 */

  // Set base particle size
  gl_PointSize = 150.0;

  // Multiply by random scale to vary particle sizes
  gl_PointSize = gl_PointSize * a_scale;

  // Ensure size is uniform across devices
  gl_PointSize = gl_PointSize * u_pixel_ratio;

  // Add size attenuation
  gl_PointSize = gl_PointSize * (1.0 / -viewPosition.z);
}
