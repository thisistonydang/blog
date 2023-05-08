import type { Instance } from "@lib/three/types/Instance";

const rawInstances = [
  { id: "A", position: { x: -1.5, y: -1.5 } },
  { id: "B", position: { x: -1.5, y: 1.5 } },
  { id: "C", position: { x: 1.5, y: 1.5 } },
  { id: "D", position: { x: 1.5, y: -1.5 } },
];

export const instances: Instance[] = rawInstances.map(({ id, position }) => {
  return {
    id,
    position: { ...position, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: 1, y: 1, z: 1 },
    color: 0x00ffff,
  };
});
