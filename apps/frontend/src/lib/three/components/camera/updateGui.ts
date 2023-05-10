import type { PerspectiveCamera } from "three";
import type { Patched } from "@lib/three/types/Patched";
import type { Controls } from "./camera";

export function updateGui({
  c,
  camera,
}: {
  c: Controls;
  camera: PerspectiveCamera & Patched;
}): void {
  camera.updateGui = ({ createFolder }) => {
    const folder = createFolder("camera");

    folder.add(c, "fov", 1, 179, 1).onChange((v: number) => {
      camera.fov = v;
      camera.updateProjectionMatrix();
    });

    folder.add(c, "near", 0.1, 10, 0.1).onChange((v: number) => {
      camera.near = v;
      camera.updateProjectionMatrix();
    });

    folder.add(c, "far", 1, 2000, 1).onChange((v: number) => {
      camera.far = v;
      camera.updateProjectionMatrix();
    });

    // Position
    folder
      .add(c, "positionX", -50, 50, 1)
      .onChange((v: number) => (camera.position.x = v));
    folder
      .add(c, "positionY", -50, 50, 1)
      .onChange((v: number) => (camera.position.y = v));
    folder
      .add(c, "positionZ", -50, 50, 1)
      .onChange((v: number) => (camera.position.z = v));
  };
}
