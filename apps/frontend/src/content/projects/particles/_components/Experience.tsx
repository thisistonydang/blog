import { TrackballControls } from "@react-three/drei";
import Particles from "./Particles";

export default function Experience() {
  return (
    <>
      <Particles />
      <TrackballControls noPan dynamicDampingFactor={0.05} />
    </>
  );
}
