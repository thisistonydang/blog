import { bright } from "@lib/colors/paul-tol";
import { ringGeometry } from "../_lib/geometries/ringGeometry";

import type { ThreeElements } from "@react-three/fiber";

export default function HoverIndicator(props: ThreeElements["mesh"]) {
  return (
    <mesh {...props} geometry={ringGeometry}>
      <meshBasicMaterial color={`#${bright.grey}`} transparent opacity={0} />
    </mesh>
  );
}
