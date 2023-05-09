import RAPIER from "@dimforge/rapier2d-compat";

import type { PhysicsInstance } from "@lib/three/types/Rapier2D";

export const rawInstances = [
  { id: "A", position: { x: -1.5, y: -1.5 } },
  { id: "B", position: { x: -1.5, y: 1.5 } },
  { id: "C", position: { x: 1.5, y: 1.5 } },
  { id: "D", position: { x: 1.5, y: -1.5 } },
];

export const instances: PhysicsInstance[] = rawInstances.map(
  ({ id, position }) => {
    return {
      id,
      position: { ...position, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
      scale: { x: 0.25, y: 1, z: 1 },
      color: 0x00ffff,
      rigidBodyDesc: RAPIER.RigidBodyDesc.dynamic(),
      restitution: 1,
    };
  }
);
