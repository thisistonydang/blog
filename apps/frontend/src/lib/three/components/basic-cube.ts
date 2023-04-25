import gsap from "gsap";
import { BoxGeometry, MathUtils, Mesh, MeshMatcapMaterial } from "three";

import type GUI from "lil-gui";
import type { UpdatableMesh } from "../systems/Loop";
import type { TweakableMesh } from "../systems/gui";

export function createBasicCube(): UpdatableMesh & TweakableMesh {
  // Tweakable controls
  const c = {
    color: 0x00ffff,
    width: 1,
    height: 1,
    depth: 1,
    visible: true,
    spin: () => {
      gsap.to(cube.rotation, { duration: 1, y: cube.rotation.y + Math.PI * 2 });
    },
  };

  // Create mesh
  const geometry = new BoxGeometry();
  const material = new MeshMatcapMaterial({ color: c.color });
  const cube = new Mesh(geometry, material) as unknown as UpdatableMesh &
    TweakableMesh;
  cube.scale.set(c.width, c.height, c.depth);
  cube.visible = c.visible;

  // Add animation behavior
  const radiansPerSecond = MathUtils.degToRad(30);
  cube.tick = (delta: number): void => {
    // Increase the cube's rotation each frame
    cube.rotation.z += radiansPerSecond * delta;
    cube.rotation.x += radiansPerSecond * delta;
    cube.rotation.y += radiansPerSecond * delta;
  };

  // Add tweaks
  cube.updateGui = (gui: GUI): void => {
    const folder = gui.addFolder("cube");

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
