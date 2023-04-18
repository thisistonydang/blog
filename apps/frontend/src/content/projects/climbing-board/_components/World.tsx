import { Canvas } from "@react-three/fiber";
import { useContext } from "react";

import Loading from "@lib/components/Loading";
import { useMounted } from "@lib/hooks/useMounted";

import { ControlsModeContext } from "../_context/ControlsModeContext";
import { DEFAULT_CAMERA_FOV } from "../_lib/constants/constants.js";
import Scene from "./Scene";

// Dev
// import { useControls } from "leva";
// import LevaControls from "@lib/components/LevaControls";

export default function World() {
  const mounted = useMounted();
  const { controlsMode, setControlsMode } = useContext(ControlsModeContext);

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
            // TODO: check near/far
            camera={{
              fov: DEFAULT_CAMERA_FOV,
              position: [20, 7.5, 20],
              near: 1,
              far: 100,
            }}
            onMouseDown={() => {
              if (controlsMode === "info") {
                setControlsMode("opened");
              }
            }}
          >
            <Scene
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
