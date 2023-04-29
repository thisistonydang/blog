import gsap from "gsap";
import { MathUtils, Mesh, MeshMatcapMaterial } from "three";
import { boxGeometry } from "../geometries/box";

import type { Patched } from "../types/Patched";

export function createCube({
  position = [0, 0, 0],
}: {
  position: [number, number, number];
}): Mesh & Patched {
  // Tweakable controls
  const c = {
    color: 0xffff00,
    width: 1,
    height: 1,
    depth: 1,
    visible: true,
    spin: () => {
      gsap.to(cube.rotation, { duration: 1, y: cube.rotation.y + Math.PI * 2 });
    },
  };

  // Create mesh
  const material = new MeshMatcapMaterial({ color: c.color });
  const cube: Mesh & Patched = new Mesh(boxGeometry, material);
  cube.position.set(...position);
  cube.scale.set(c.width, c.height, c.depth);
  cube.visible = c.visible;

  // Add event handlers
  cube.onClick = () => {
    if (cube.scale.x === 1) {
      cube.scale.set(2, 2, 2);
    } else {
      cube.scale.set(1, 1, 1);
    }
  };

  cube.onPointerEnter = () => {
    material.color.set(0xff0000);
    document.body.style.cursor = "pointer";
  };

  cube.onPointerLeave = () => {
    document.body.style.cursor = "default";
    material.color.set(c.color);
  };

  // Add animation behavior
  const radiansPerSecond = MathUtils.degToRad(30);
  cube.tick = (delta) => {
    // Increase the cube's rotation each frame
    cube.rotation.z += radiansPerSecond * delta;
    cube.rotation.x += radiansPerSecond * delta;
    cube.rotation.y += radiansPerSecond * delta;
  };

  // Add tweaks
  cube.updateGui = (createFolder) => {
    const folder = createFolder("cube");

    folder.addColor(c, "color").onChange((v: string) => material.color.set(v));
    folder.add(c, "width", 1, 3, 1).onChange((v: number) => (cube.scale.x = v));
    folder
      .add(c, "height", [...Array(4).keys()].splice(1))
      .onChange((v: number) => (cube.scale.y = v));
    folder
      .add(c, "depth", { depth1: 1, depth2: 2, depth3: 3 })
      .onChange((v: number) => (cube.scale.z = v));
    folder.add(c, "visible").onChange((v: boolean) => (cube.visible = v));
    folder.add(c, "spin");
  };

  return cube;
}
