import gsap from "gsap";
import { BoxGeometry, Mesh, MeshMatcapMaterial } from "three";

import { approxEq } from "@lib/math/approxEq";
import { boxGeometry } from "@lib/three/geometries/box";

import { updateGui } from "./updateGui";
import { addPhysics3D } from "./addPhysics3D";

import type { Patched } from "@lib/three/types/Patched";
import type { World } from "@lib/three/World";

export interface Controls {
  color: number;
  positionX: number;
  positionY: number;
  positionZ: number;
  width: number;
  height: number;
  depth: number;
  visible: boolean;
  spin: () => void;
}

export function floor({
  world,
  position = [0, 0, 0],
}: {
  world: World;
  position?: [number, number, number];
}): Mesh<BoxGeometry> & Patched {
  const c: Controls = {
    color: 0xffffff,
    positionX: position[0],
    positionY: position[1],
    positionZ: position[2],
    width: 50,
    height: 1,
    depth: 50,
    visible: true,
    spin: () => {
      const end = mesh.rotation.y + Math.PI * 2;
      gsap.to(mesh.rotation, { duration: 1, y: end });
      world.loop.runWhile(() => !approxEq(mesh.rotation.y, end));
    },
  };

  // Create mesh
  const material = new MeshMatcapMaterial({ color: c.color });
  const mesh: Mesh<BoxGeometry> & Patched = new Mesh(boxGeometry, material);
  mesh.position.set(c.positionX, c.positionY, c.positionZ);
  mesh.scale.set(c.width, c.height, c.depth);
  mesh.visible = c.visible;

  // Add physics
  addPhysics3D({ mesh });

  // Add tweaks
  updateGui({ c, material, mesh });

  return mesh;
}
