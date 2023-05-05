import gsap from "gsap";
import { InstancedMesh, MeshMatcapMaterial } from "three";

import { approxEq } from "@lib/math/approxEq";
import { boxGeometry } from "../../geometries/box";

import { instances } from "./instances";
import { onClick } from "./onClick";
import { onHover } from "./onHover";
import { tickOnWorldStart } from "./tickOnWorldStart";
import { updateGui } from "./updateGui";
import { updateInstanceColors } from "./updateInstanceColors";
import { updateInstanceMatrices } from "./updateInstanceMatrices";

import type { Patched } from "../../types/Patched";
import type { World } from "../../World";

export interface Controls {
  visible: boolean;
  spin: () => void;
}

export const INSTANCE_IDS_KEY = "instance_ids";

export function instancedMesh({
  world,
}: {
  world: World;
}): InstancedMesh & Patched {
  const c: Controls = {
    visible: true,
    spin: () => {
      const end = mesh.rotation.y + Math.PI * 2;
      gsap.to(mesh.rotation, { duration: 1, y: end });
      world.loop.runWhile(() => !approxEq(mesh.rotation.y, end));
    },
  };

  // Create mesh
  const material = new MeshMatcapMaterial();
  const mesh: InstancedMesh & Patched = new InstancedMesh(
    boxGeometry,
    material,
    4
  );
  mesh.visible = c.visible;
  mesh.userData[INSTANCE_IDS_KEY] = instances.map(({ id }) => id);
  updateInstanceMatrices(mesh, instances);
  updateInstanceColors(mesh, instances);

  // Add event handlers
  onClick({ mesh });
  onHover({ mesh });

  // Add tick on world start
  tickOnWorldStart({ mesh });

  // Add tweaks
  updateGui({ c, mesh });

  return mesh;
}
