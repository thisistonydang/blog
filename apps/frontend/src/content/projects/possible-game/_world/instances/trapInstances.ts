import type { Instance } from "@lib/three/types/Instance";

const traps = [
  // Intro
  { gap: 10, y: 0.5 }, // Single
  { gap: 7, y: 0.5 }, // Single
  { gap: 7, y: 0.5 }, // Single
  { gap: 7, y: 0.5 }, // Double
  { gap: 1, y: 0.5 },
  { gap: 7, y: 1 }, // Single raised
  { gap: 7, y: 0.5 }, // Double
  { gap: 1, y: 0.5 },
  { gap: 7, y: 1 }, // Stacked
  { gap: 0, y: 3 },
  { gap: 7, y: 0.5 }, // Double
  { gap: 1, y: 0.5 },
  { gap: 7, y: 0.5 }, // Double
  { gap: 1, y: 0.5 },
  { gap: 7, y: 1 }, // Stacked
  { gap: 0, y: 3 },
  { gap: 7, y: 0.5 }, // Double
  { gap: 1, y: 0.5 },
  { gap: 6, y: 0.5 }, // Single
  { gap: 6, y: 0.5 }, // Single
  { gap: 6, y: 0.5 }, // Single
  { gap: 6, y: 0.5 }, // Single
  // Stairs up 1
  { gap: 15.5, y: 1 },
  { gap: 6, y: 2 },
  { gap: 6, y: 3 },
  // Stairs down 1
  { gap: 7, y: 2 },
  { gap: 3, y: 1 },
  { gap: 3, y: 0 },
  // Stairs up 2
  { gap: 5, y: 1 },
  { gap: 6, y: 2 },
  { gap: 6, y: 3 },
  // Stairs down 2
  { gap: 7, y: 2 },
  { gap: 3, y: 1 },
  { gap: 2, y: 0 },
  // Hurdle trap
  { gap: 5, y: 1 },
  { gap: 6, y: -1 },
  { gap: 1, y: 0 },
  // Pit trap 1
  { gap: 11, y: 0 },
  { gap: 1, y: 0 },
  { gap: 1, y: 0 },
  // Pit trap 2
  { gap: 6, y: 0 },
  { gap: 1, y: 0 },
  { gap: 1, y: 0 },
  // Stairs up 3
  { gap: 10, y: 1 },
  { gap: 5, y: 2 },
  { gap: 5, y: 3 },
  { gap: 6, y: 4 },
  { gap: 1, y: 3 },
  { gap: 6, y: 4 },
  { gap: 5, y: 5 },
  // Drop
  { gap: 9, y: 2 },
  { gap: 1, y: 1 },
  { gap: 1, y: 0 },
  { gap: 0.5, y: -1 },
  { gap: 0.5, y: -2 },
  { gap: 0.25, y: -3 },
  { gap: 0.25, y: -4 },
  { gap: 0.25, y: -5 },
  { gap: 0.25, y: -6 },
  { gap: 0.25, y: -7 },
  { gap: 0.25, y: -8 },
  { gap: 0.25, y: -9 },
  { gap: 0.25, y: -10 },
  { gap: 0.25, y: -11 },
];

let prevTrapPosition = 0;

export const trapInstances: Instance[] = traps.map(({ gap, y }, index) => {
  const positionX = prevTrapPosition + gap;

  // Update previous trap position for next trap
  prevTrapPosition = positionX;

  return {
    id: `trap-${index}`,
    position: { x: positionX, y, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: 0.5, y: 0.5, z: 0.5 },
    color: 0xffffff,
  };
});
