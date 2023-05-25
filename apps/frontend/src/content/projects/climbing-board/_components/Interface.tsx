import { useContext, useState } from "react";

import IconButton from "@lib/react/components/IconButton";
import Prose from "@lib/react/components/Prose";
import HamburgerMenuIcon from "@lib/react/svg/HamburgerMenuIcon";
import XIcon from "@lib/react/svg/XIcon";

import { ControlsModeContext } from "../_context/ControlsModeContext";
import AngleControls from "./AngleControls";
import BrowseControls from "./BrowseControls";
import EditControls from "./EditControls";
import FirstVisitModal from "./FirstVisitModal";
import InfoControls from "./InfoControls";
import OpenedControls from "./OpenedControls";
import WidthControls from "./WidthControls";

export default function Interface() {
  const { controlsMode, setControlsMode } = useContext(ControlsModeContext);
  const [showInfoPing, setShowInfoPing] = useState(true);

  return (
    <>
      <FirstVisitModal />
      <nav>
        {["closed", "opened"].includes(controlsMode) && (
          <div
            className="
              fixed bottom-8 left-8 flex
              animate-[fade-in_0.25s] animate-[fly-right_0.25s]
              items-center gap-4
            "
          >
            <IconButton
              ariaLabel="Show controls."
              ariaLabelToggled="Hide controls."
              toggledText={<XIcon width={20} height={20} />}
              isToggled={controlsMode === "opened"}
              onClick={() => {
                setControlsMode(
                  controlsMode === "closed" ? "opened" : "closed"
                );
              }}
            >
              <HamburgerMenuIcon width={30} height={30} />
            </IconButton>
            <Prose>
              <h1 className="xxs:text-4xl text-2xl">Climbing Board</h1>
            </Prose>
          </div>
        )}
        {controlsMode === "opened" && (
          <OpenedControls
            showInfoPing={showInfoPing}
            setShowInfoPing={setShowInfoPing}
          />
        )}
        {controlsMode === "info" && <InfoControls />}
        {controlsMode === "width" && <WidthControls />}
        {controlsMode === "angle" && <AngleControls />}
        {controlsMode === "browse" && <BrowseControls />}
        {controlsMode === "edit" && <EditControls />}
      </nav>
    </>
  );
}
