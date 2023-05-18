import { OrthographicCamera } from "three";

export function orthographicCamera({
  left = -10,
  right = 10,
  top = 10,
  bottom = -10,
  near = 0.1,
  far = 2000,
  zoom = 1,
  position = [0, 0, 10],
  scale = 1,
}: {
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
  near?: number;
  far?: number;
  zoom?: number;
  position?: [number, number, number];
  scale?: number;
}) {
  // Create camera
  const camera = new OrthographicCamera(
    left * scale,
    right * scale,
    top * scale,
    bottom * scale,
    near,
    far
  );

  camera.zoom = zoom;
  camera.position.set(position[0], position[1], position[2]);

  return camera;
}
