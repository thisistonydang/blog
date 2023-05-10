import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { updateGui } from "./updateGui";

import type { Patched } from "../../types/Patched";
import type { World } from "../../World";

export interface Controls {
  enabled: boolean;
  enableDamping: boolean;
  enablePan: boolean;
  enableRotate: boolean;
  enableZoom: boolean;
  minAzimuthAngle: number;
  maxAzimuthAngle: number;
  minPolarAngle: number;
  maxPolarAngle: number;
  maxDistance: number;
  minDistance: number;
  targetX: number;
  targetY: number;
  targetZ: number;
}

export function orbitControls(
  { camera, renderer, loop }: World,
  {
    enabled = true,
    enableDamping = true,
    enablePan = true,
    enableRotate = true,
    enableZoom = true,
    minAzimuthAngle = Infinity,
    maxAzimuthAngle = Infinity,
    minPolarAngle = 0,
    maxPolarAngle = Math.PI,
    minDistance = 0,
    maxDistance = Infinity,
    targetX = 0,
    targetY = 0,
    targetZ = 0,
  }
): OrbitControls {
  const c: Controls = {
    enabled,
    enableDamping,
    enablePan,
    enableRotate,
    enableZoom,
    minAzimuthAngle,
    maxAzimuthAngle,
    minPolarAngle,
    maxPolarAngle,
    minDistance,
    maxDistance,
    targetX,
    targetY,
    targetZ,
  };

  // Create controls.
  const controls: OrbitControls & Patched = new OrbitControls(
    camera,
    renderer.domElement
  );
  controls.enabled = c.enabled;
  controls.enableDamping = c.enableDamping;
  controls.enablePan = c.enablePan;
  controls.enableRotate = c.enableRotate;
  controls.enableZoom = c.enableZoom;
  controls.minAzimuthAngle = c.minAzimuthAngle;
  controls.maxAzimuthAngle = c.maxAzimuthAngle;
  controls.minPolarAngle = c.minPolarAngle;
  controls.maxPolarAngle = c.maxPolarAngle;
  controls.minDistance = c.minDistance;
  controls.maxDistance = c.maxDistance;
  controls.target.x = c.targetX;
  controls.target.y = c.targetY;
  controls.target.z = c.targetZ;

  // When rendering on demand, request a render on change events if a render has
  // not already been requested.
  controls.addEventListener("change", loop.requestRender);

  // Update controls each tick to allow damping.
  controls.tickOnRenderRequest = () => controls.update();
  controls.tickOnWorldStart = () => controls.update();

  // Add tweaks
  updateGui({ c, controls });

  return controls;
}
