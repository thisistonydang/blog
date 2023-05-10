import type { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import type { Patched } from "@lib/three/types/Patched";
import type { Controls } from "./orbitControls";

export function updateGui({
  c,
  controls,
}: {
  c: Controls;
  controls: OrbitControls & Patched;
}): void {
  controls.updateGui = ({ createFolder }) => {
    const folder = createFolder("orbit controls");

    folder.add(c, "enabled").onChange((v: boolean) => {
      controls.enabled = v;
    });
    folder.add(c, "enableDamping").onChange((v: boolean) => {
      controls.enableDamping = v;
    });
    folder.add(c, "enablePan").onChange((v: boolean) => {
      controls.enablePan = v;
    });
    folder.add(c, "enableRotate").onChange((v: boolean) => {
      controls.enableRotate = v;
    });
    folder.add(c, "enableZoom").onChange((v: boolean) => {
      controls.enableZoom = v;
    });

    // Horizontal orbit range
    folder.add(c, "minAzimuthAngle", -2 * Math.PI, 0).onChange((v: number) => {
      controls.minAzimuthAngle = v;
    });
    folder.add(c, "maxAzimuthAngle", 0, 2 * Math.PI).onChange((v: number) => {
      controls.maxAzimuthAngle = v;
    });

    // Vertical orbit range
    folder.add(c, "minPolarAngle", 0, Math.PI).onChange((v: number) => {
      controls.minPolarAngle = v;
    });
    folder.add(c, "maxPolarAngle", 0, Math.PI).onChange((v: number) => {
      controls.maxPolarAngle = v;
    });

    // Zoom range
    folder.add(c, "minDistance", 0, 100).onChange((v: number) => {
      controls.minDistance = v;
    });
    folder.add(c, "maxDistance", 1, 2000).onChange((v: number) => {
      controls.maxDistance = v;
    });

    // Target
    folder.add(c, "targetX", -50, 50).onChange((v: number) => {
      controls.target.x = v;
    });
    folder.add(c, "targetY", -50, 50).onChange((v: number) => {
      controls.target.y = v;
    });
    folder.add(c, "targetZ", -50, 50).onChange((v: number) => {
      controls.target.z = v;
    });
  };
}
