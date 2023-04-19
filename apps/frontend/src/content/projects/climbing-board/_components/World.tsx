import { Canvas } from "@react-three/fiber";
import { useContext } from "react";

import Loading from "@lib/components/Loading";
import { useMounted } from "@lib/hooks/useMounted";

import { ALLOWED_WIDTHS } from "../_context/BoardWidthContext";
import { ControlsModeContext } from "../_context/ControlsModeContext";
import {
  CRASH_PAD_PADDING,
  DEFAULT_CAMERA_FOV,
} from "../_lib/constants/constants.js";
import Scene from "./Scene";

// Dev
// import { useControls } from "leva";
// import LevaControls from "@lib/components/LevaControls";

export default function World() {
  const mounted = useMounted();
  const { controlsMode, setControlsMode } = useContext(ControlsModeContext);
  const MAX_ORBIT_CONTROLS_DISTANCE = 50;
  const maxBoardWidth = ALLOWED_WIDTHS.at(-1) ?? 18;
  const maxModelWidth = maxBoardWidth + 2 * CRASH_PAD_PADDING;

  // const { showPerf } = useControls({
  //   showPerf: { value: false },
  // });

  return (
    <>
      {mounted ? (
        <div
          className={`
            h-screen w-screen
            ${
              ["closed", "opened", "info", "width", "angle"].includes(
                controlsMode
              ) && "cursor-grab active:cursor-grabbing"
            }
          `}
        >
          <Canvas
            shadows
            frameloop={/*showPerf ? "always" : */ "demand"}
            camera={{
              fov: DEFAULT_CAMERA_FOV,
              position: [20, 7.5, 20],
              near: 0.1,
              far: MAX_ORBIT_CONTROLS_DISTANCE + maxModelWidth,
            }}
            onMouseDown={() => {
              if (controlsMode === "info") {
                setControlsMode("opened");
              }
            }}
          >
            <Scene
              maxOrbitControlsDistance={MAX_ORBIT_CONTROLS_DISTANCE}
              // showPerf={showPerf}
            />
          </Canvas>
          {/* <LevaControls collapsed={true} /> */}
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
