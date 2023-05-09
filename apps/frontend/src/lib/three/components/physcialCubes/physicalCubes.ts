import gsap from "gsap";
import { BoxGeometry, InstancedMesh, MeshMatcapMaterial } from "three";

import { approxEq } from "@lib/math/approxEq";
import { boxGeometry } from "@lib/three/geometries/box";
import { setInstanceIds } from "@lib/three/utils/instances/setInstanceIds";
import { updateInstanceColors } from "@lib/three/utils/instances/updateInstanceColors";
import { updateInstanceMatrices } from "@lib/three/utils/instances/updateInstanceMatrices";

import { addPhysics3D } from "./addPhysics3D";
import { instances } from "./instances";
import { onClick } from "./onClick";
import { onHover } from "./onHover";
import { updateGui } from "./updateGui";

import type { Patched } from "@lib/three/types/Patched";
import type { World } from "@lib/three/World";

export interface Controls {
  visible: boolean;
  spin: () => void;
}

export function physicalCubes({
  world,
}: {
  world: World;
}): InstancedMesh<BoxGeometry> & Patched {
  const c: Controls = {
    visible: true,
    spin: () => {
      const end = instancedMesh.rotation.y + Math.PI * 2;
      gsap.to(instancedMesh.rotation, { duration: 1, y: end });
      world.loop.runWhile(() => !approxEq(instancedMesh.rotation.y, end));
    },
  };

  // Create instancedMesh
  const material = new MeshMatcapMaterial();
  const instancedMesh: InstancedMesh<BoxGeometry> & Patched = new InstancedMesh(
    boxGeometry,
    material,
    4
  );
  instancedMesh.visible = c.visible;
  setInstanceIds(instancedMesh, instances);
  updateInstanceMatrices(instancedMesh, instances);
  updateInstanceColors(instancedMesh, instances);

  // Physics
  addPhysics3D({ instancedMesh });

  // Add event handlers
  onClick({ world, instancedMesh });
  onHover({ instancedMesh });

  // Add tweaks
  updateGui({ c, instancedMesh });

  return instancedMesh;
}