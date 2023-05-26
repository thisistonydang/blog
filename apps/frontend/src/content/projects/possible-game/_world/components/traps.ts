import RAPIER from "@dimforge/rapier2d-compat";
import { InstancedMesh, MeshBasicMaterial } from "three";

import { theme } from "@layouts/page/_stores/theme";

import { boxGeometry } from "@lib/three/geometries/box";
import { addInstancedMesh } from "@lib/three/systems/Physics/2D/addInstancedMesh";
import { cuboidColliderDesc } from "@lib/three/systems/Physics/2D/cuboidColliderDesc";
import { setInstanceIds } from "@lib/three/utils/instances/setInstanceIds";
import { updateInstanceColors } from "@lib/three/utils/instances/updateInstanceColors";
import { updateInstanceMatrices } from "@lib/three/utils/instances/updateInstanceMatrices";

import type { BoxGeometry } from "three";
import type { Instance } from "@lib/three/types/Instance";
import type { Patched } from "@lib/three/types/Patched";
import type { PhysicsInstance } from "@lib/three/types/Rapier2D";

export function traps({
  instances,
  hasPhysics = false,
}: {
  instances: Instance[];
  hasPhysics?: boolean;
}): InstancedMesh {
  // Create instancedMesh
  const material = new MeshBasicMaterial({ wireframe: true });
  const instancedMesh: InstancedMesh<BoxGeometry> & Patched = new InstancedMesh(
    boxGeometry,
    material,
    instances.length
  );
  setInstanceIds(instancedMesh, instances);
  updateInstanceMatrices(instancedMesh, instances);
  updateInstanceColors(instancedMesh, instances);

  // Add physics
  if (hasPhysics) {
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
  }

  // Sync trap color with theme
  theme.subscribe((theme) => {
    material.color.set(theme === "dark" ? 0xff00ff : 0x9e009e);
  });

  return instancedMesh;
}
