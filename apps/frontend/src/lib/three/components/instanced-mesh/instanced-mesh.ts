import gsap from "gsap";
import { InstancedMesh, MeshMatcapMaterial } from "three";

import { boxGeometry } from "../../geometries/box";

import { addOnClickHandler } from "./add-on-click-handler";
import { addOnHoverHandler } from "./add-on-hover-handler";
import { addTick } from "./add-tick";
import { INSTANCE_IDS_KEY } from "./get-instance";
import { instances } from "./instances";
import { updateInstanceColors } from "./update-instance-colors";
import { updateInstanceMatrices } from "./update-instance-matrices";

import type { Patched } from "../../types/Patched";

export function createInstancedMesh(): InstancedMesh & Patched {
  // Tweakable controls
  const c = {
    visible: true,
    spin: () => {
      gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI * 2 });
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
  addOnClickHandler(mesh);
  addOnHoverHandler(mesh);

  // Add tick function
  addTick(mesh);

  // Add tweaks
  mesh.updateGui = (createFolder) => {
    const folder = createFolder("instanced mesh");

    folder.add(c, "visible").onChange((v: boolean) => (mesh.visible = v));
    folder.add(c, "spin");
  };

  return mesh;
}
