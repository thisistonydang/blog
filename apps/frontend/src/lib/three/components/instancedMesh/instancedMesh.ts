import gsap from "gsap";
import { InstancedMesh, MeshMatcapMaterial } from "three";

import { approxEq } from "@lib/math/approxEq";
import { boxGeometry } from "@lib/three/geometries/box";
import { setInstanceIds } from "@lib/three/utils/instances/setInstanceIds";
import { updateInstanceColors } from "@lib/three/utils/instances/updateInstanceColors";
import { updateInstanceMatrices } from "@lib/three/utils/instances/updateInstanceMatrices";

import { instances } from "./instances";
import { onClick } from "./onClick";
import { onHover } from "./onHover";
import { tickOnWorldStart } from "./tickOnWorldStart";
import { updateGui } from "./updateGui";

import type { World } from "@lib/three/World";

export interface Controls {
  visible: boolean;
  spin: () => void;
}

export function instancedMesh(world: World) {
  const c: Controls = {
    visible: true,
    spin: () => {
      const end = instancedMesh.rotation.y + Math.PI * 2;
      gsap.to(instancedMesh.rotation, { duration: 1, y: end });
      world.loop.runWhile(() => !approxEq(instancedMesh.rotation.y, end));
    },
  };

  // Create instanced mesh
  const material = new MeshMatcapMaterial();
  const instancedMesh = new InstancedMesh(boxGeometry, material, 4);
  instancedMesh.visible = c.visible;
  setInstanceIds(instancedMesh, instances);
  updateInstanceMatrices(instancedMesh, instances);
  updateInstanceColors(instancedMesh, instances);

  // Add event handlers
  onClick({ instancedMesh });
  onHover({ instancedMesh });

  // Add tick on world start
  tickOnWorldStart({ instancedMesh });

  // Add tweaks
  updateGui({ c, instancedMesh });

  return instancedMesh;
}
