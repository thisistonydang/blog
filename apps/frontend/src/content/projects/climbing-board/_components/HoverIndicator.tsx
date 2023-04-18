import { MeshBasicMaterial } from "three";

import { bright } from "@lib/colors/paul-tol";
import { ringGeometry } from "../_lib/geometries/ringGeometry";

import type { ThreeElements } from "@react-three/fiber";

const material = new MeshBasicMaterial({
  color: `#${bright.grey}`,
  transparent: true,
  opacity: 0.5,
});

export default function HoverIndicator(props: ThreeElements["mesh"]) {
  return <mesh {...props} geometry={ringGeometry} material={material}></mesh>;
}
