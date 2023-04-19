import { BakeShadows, OrbitControls } from "@react-three/drei";
import { useContext, useRef, useState } from "react";
import { Vector3 } from "three";

import { BoardWidthContext } from "../_context/BoardWidthContext";
import { ControlsModeContext } from "../_context/ControlsModeContext";
import { useCameraTransitioningFromOpenedAnimation } from "../_hooks/useCameraTransitioningFromOpenedAnimation";
import { useCameraTransitioningToOpenedAnimation } from "../_hooks/useCameraTransitioningToOpenedAnimation";
import { useFovResizer } from "../_hooks/useFovResizer";
import { useRotationAnimation } from "../_hooks/useRotationAnimation";
import { useScaleAnimation } from "../_hooks/useScaleAnimation";

import CrashPad from "./CrashPad";
import KickBoardPanelGroup from "./KickBoardPanelGroup";
import MainBoardRotationGroup from "./MainBoardRotationGroup";
import MainSpotLight from "./MainSpotLight";
import ShadowDirectionalLight from "./ShadowDirectionalLight";
import ShadowPlane from "./ShadowPlane";

import type { Group } from "three";

// Dev
// import { Perf } from "r3f-perf";

const BROWSE_AND_EDIT_CAMERA_HEIGHT = 4;
const orbitControlsTarget = new Vector3(0, BROWSE_AND_EDIT_CAMERA_HEIGHT, 0);

export default function Scene({
  maxOrbitControlsDistance,
}: // showPerf = false,
{
  maxOrbitControlsDistance: number;
  showPerf?: boolean;
}) {
  const { controlsMode } = useContext(ControlsModeContext);
  const { boardWidth } = useContext(BoardWidthContext);
  const group = useRef<Group>(null);
  const [modelRotated, setModelRotated] = useState(false);
  const [modelScaled, setModelScaled] = useState(false);
  const introAnimationCompleted = modelRotated && modelScaled;

  useFovResizer();
  useRotationAnimation(group, setModelRotated);
  useScaleAnimation(group, setModelScaled);
  useCameraTransitioningFromOpenedAnimation(BROWSE_AND_EDIT_CAMERA_HEIGHT);
  useCameraTransitioningToOpenedAnimation();

  return (
    <>
      {/* Objects */}
      <group ref={group} scale={[0, 0, 0]} position={[0, -4, 0]}>
        <MainSpotLight />
        <MainBoardRotationGroup />
        <KickBoardPanelGroup />
        <CrashPad />
        <ShadowPlane introAnimationCompleted={introAnimationCompleted} />
        <ShadowDirectionalLight />
      </group>

      {/* Systems */}
      {introAnimationCompleted && <BakeShadows key={boardWidth} />}

      {["closed", "opened", "info", "width", "angle"].includes(
        controlsMode
      ) && (
        <OrbitControls maxDistance={maxOrbitControlsDistance} minDistance={5} />
      )}

      {controlsMode === "edit" && (
        <OrbitControls
          target={orbitControlsTarget}
          enableRotate={false}
          maxDistance={15}
          minDistance={1}
        />
      )}

      {/* Dev */}
      {/* {showPerf && <Perf deepAnalyze position="bottom-right" />} */}
      {/* <axesHelper args={[20]} /> */}
    </>
  );
}
