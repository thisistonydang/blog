import { MathUtils } from "three";

import type { Mesh } from "three";
import type { Patched } from "@lib/three/types/Patched";

export function tickOnWorldStart({ mesh }: { mesh: Mesh & Patched }): void {
  const radiansPerSecond = MathUtils.degToRad(30);

  mesh.tickOnWorldStart = ({ delta }) => {
    mesh.rotation.z += radiansPerSecond * delta;
    mesh.rotation.x += radiansPerSecond * delta;
    mesh.rotation.y += radiansPerSecond * delta;
  };
}
