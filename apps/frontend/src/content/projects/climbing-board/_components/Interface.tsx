import { useContext, useEffect } from "react";

import IconButton from "@lib/components/IconButton";
import Prose from "@lib/components/Prose";

import { ControlsModeContext } from "../_context/ControlsModeContext";
import AngleControls from "./AngleControls";
import BrowseControls from "./BrowseControls";
import EditControls from "./EditControls";
import InfoControls from "./InfoControls";
import OpenedControls from "./OpenedControls";
import WidthControls from "./WidthControls";

export default function Interface() {
  const { controlsMode, setControlsMode } = useContext(ControlsModeContext);

  // Open controls on mount.
  useEffect(() => setControlsMode("opened"), [setControlsMode]);

  return (
    <nav>
      {["closed", "opened"].includes(controlsMode) && (
        <div
          className="
            fixed bottom-8 left-8 flex
            animate-[fly-right_0.25s] animate-[fade-in_0.25s]
            items-center gap-4
          "
        >
          <IconButton
            ariaLabel="Show controls."
            ariaLabelToggled="Hide controls."
            toggledText={<>&times;</>}
            isToggled={controlsMode === "opened"}
            onClick={() => {
              setControlsMode(controlsMode === "closed" ? "opened" : "closed");
            }}
          >
            &#x2B;
          </IconButton>
          <Prose>
            <h1 className="xxs:text-4xl text-2xl">Climbing Board</h1>
          </Prose>
        </div>
      )}
      {controlsMode === "opened" && <OpenedControls />}
      {controlsMode === "info" && <InfoControls />}
      {controlsMode === "width" && <WidthControls />}
      {controlsMode === "angle" && <AngleControls />}
      {controlsMode === "browse" && <BrowseControls />}
      {controlsMode === "edit" && <EditControls />}
    </nav>
  );
}
