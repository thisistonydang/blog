import RAPIER from "@dimforge/rapier2d-compat";
import { get } from "svelte/store";
import {
  InstancedMesh,
  MeshBasicMaterial,
  SRGBColorSpace,
  Texture,
} from "three";

import { theme } from "@layouts/page/_stores/theme";

import { boxGeometry } from "@lib/three/geometries/box";
import { addInstancedMesh } from "@lib/three/systems/Physics/2D/addInstancedMesh";
import { cuboidColliderDesc } from "@lib/three/systems/Physics/2D/cuboidColliderDesc";
import { setInstanceIds } from "@lib/three/utils/instances/setInstanceIds";
import { updateInstanceColors } from "@lib/three/utils/instances/updateInstanceColors";
import { updateInstanceMatrices } from "@lib/three/utils/instances/updateInstanceMatrices";

import { trapImage } from "../../_stores/appState";

import type { BoxGeometry } from "three";
import type { Instance } from "@lib/three/types/Instance";
import type { Patched } from "@lib/three/types/Patched";
import type { PhysicsInstance } from "@lib/three/types/Rapier2D";

export function traps({ instances }: { instances: Instance[] }): InstancedMesh {
  const image = get(trapImage);
  let map: Texture | null = null;

  // Load trap image as texture if available
  if (image) {
    map = new Texture(image);
    map.colorSpace = SRGBColorSpace;
    map.needsUpdate = true;
  }

  // Create instancedMesh
  const material = new MeshBasicMaterial({
    map,
    transparent: true,
    wireframe: !image,
  });
  const instancedMesh: InstancedMesh<BoxGeometry> & Patched = new InstancedMesh(
    boxGeometry,
    material,
    instances.length
  );
  setInstanceIds(instancedMesh, instances);
  updateInstanceMatrices(instancedMesh, instances);
  updateInstanceColors(instancedMesh, instances);

  // Add physics
  instancedMesh.addPhysics2D = (physics) => {
    const physicsInstances: PhysicsInstance[] = instances.map((instance) => {
      return {
        ...instance,
        rigidBodyDesc: RAPIER.RigidBodyDesc.fixed(),
        colliderDesc: cuboidColliderDesc(instancedMesh, instance.scale),
      };
    });

    addInstancedMesh({ physics, instancedMesh, physicsInstances });
  };

  // Sync trap color with theme
  theme.subscribe((theme) => {
    material.color.set(theme === "dark" ? 0xffffff : 0xc0c0c0);
  });

  return instancedMesh;
}
