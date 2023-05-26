import type { Instance } from "@lib/three/types/Instance";

const platformHeight = 0.01;

const platforms = [
  // Intro
  { gap: -5, height: 0, length: 128 },
  // Stairs up 1
  { gap: 2, height: 1, length: 4 },
  { gap: 2, height: 2, length: 4 },
  { gap: 2, height: 3, length: 5 },
  // Stairs down 1
  { gap: 2, height: 2, length: 1 },
  { gap: 2, height: 1, length: 1 },
  { gap: 2, height: 0, length: 3 },
  // Stairs up 2
  { gap: 2, height: 1, length: 4 },
  { gap: 2, height: 2, length: 4 },
  { gap: 2, height: 3, length: 5 },
  // Stairs down 2
  { gap: 2, height: 2, length: 1 },
  { gap: 2, height: 1, length: 1 },
  { gap: 1, height: 0, length: 3 },
  // Hurdle trap
  { gap: 5, height: -1, length: 1 },
  { gap: 3, height: 0, length: 10 },
  // Pit trap 1
  { gap: 3, height: 0, length: 5 },
  // Pit trap 2
  { gap: 3, height: 0, length: 8 },
  // Stairs up 3
  { gap: 2, height: 1, length: 3 },
  { gap: 2, height: 2, length: 3 },
  { gap: 2, height: 3, length: 4 },
  { gap: 3, height: 3, length: 4 },
  { gap: 2, height: 4, length: 3 },
  { gap: 2, height: 5, length: 5 },
  // Drop
  { gap: 10, height: -15, length: 65 },
];

let startPosition = 0;

export const platformInstances: Instance[] = platforms.map(
  ({ gap, height, length }, index) => {
    const positionX = startPosition + gap + length / 2;
    const positionY = -platformHeight / 2 + height;

    // Update start position for next platform
    startPosition = positionX + length / 2;

    let id = `platform-${index}`;
    if (index === platforms.length - 1) {
      id = "last-platform";
    } else if (index === platforms.length - 2) {
      id = "second-to-last-platform";
    }

    return {
      id,
      position: { x: positionX, y: positionY, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
      scale: { x: length, y: platformHeight, z: 2 },
      color: 0xffffff,
    };
  }
);
