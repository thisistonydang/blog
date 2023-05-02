import { MathUtils } from "three";

import type { Mesh } from "three";
import type { Patched } from "../../types/Patched";

export function tick({ mesh }: { mesh: Mesh & Patched }): void {
  const radiansPerSecond = MathUtils.degToRad(30);

  mesh.tick = ({ delta, frameloop }) => {
    if (frameloop === "always") {
      mesh.rotation.z += radiansPerSecond * delta;
      mesh.rotation.x += radiansPerSecond * delta;
      mesh.rotation.y += radiansPerSecond * delta;
    }
  };
}
