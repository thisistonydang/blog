import { bright } from "@lib/colors/paul-tol";

import type { ThreeElements } from "@react-three/fiber";

export default function HoverIndicator(props: ThreeElements["mesh"]) {
  return (
    <mesh {...props}>
      <ringGeometry args={[0.3, 0.4, 32]} />
      <meshBasicMaterial color={`#${bright.grey}`} transparent opacity={0} />
    </mesh>
  );
}
