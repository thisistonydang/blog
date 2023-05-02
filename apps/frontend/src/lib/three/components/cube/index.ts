import gsap from "gsap";
import { Mesh, MeshMatcapMaterial } from "three";

import { approxEq } from "@lib/math/approxEq";
import { boxGeometry } from "../../geometries/box";

import { onClick } from "./onClick";
import { onHover } from "./onHover";
import { tick } from "./tick";
import { updateGui } from "./updateGui";

import type { Patched } from "../../types/Patched";
import type { World } from "../../World";

export interface Controls {
  color: number;
  positionX: number;
  positionY: number;
  positionZ: number;
  width: number;
  height: number;
  depth: number;
  visible: boolean;
  isExpanding: boolean;
  spin: () => void;
}

export function createCube({
  world,
  position = [0, 0, 0],
}: {
  world: World;
  position: [number, number, number];
}): Mesh & Patched {
  // Controls
  const c: Controls = {
    color: 0xffff00,
    positionX: position[0],
    positionY: position[1],
    positionZ: position[2],
    width: 1,
    height: 1,
    depth: 1,
    visible: true,
    isExpanding: false,
    spin: () => {
      const end = mesh.rotation.y + Math.PI * 2;
      gsap.to(mesh.rotation, { duration: 1, y: end });
      world.loop.runWhile(() => !approxEq(mesh.rotation.y, end));
    },
  };

  // Create mesh
  const material = new MeshMatcapMaterial({ color: c.color });
  const mesh: Mesh & Patched = new Mesh(boxGeometry, material);
  mesh.position.set(c.positionX, c.positionY, c.positionZ);
  mesh.scale.set(c.width, c.height, c.depth);
  mesh.visible = c.visible;

  // Add event handlers
  onClick({ world, c, mesh });
  onHover({ c, material, mesh });

  // Add tick function
  tick({ mesh });

  // Add tweaks
  updateGui({ world, c, material, mesh });

  return mesh;
}
