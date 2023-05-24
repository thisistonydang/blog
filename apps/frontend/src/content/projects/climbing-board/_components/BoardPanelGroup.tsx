import { useContext, useState } from "react";

import { useHasTouchScreen } from "@lib/react/hooks/useHasTouchScreen";

import { ControlsModeContext } from "../_context/ControlsModeContext";
import { BOARD_THICKNESS } from "../_lib/constants/constants.js";

import BoardPanel from "./BoardPanel";
import Holds from "./Holds";
import HoverIndicator from "./HoverIndicator";
import InteractivePlanes from "./InteractivePlanes";
import Nuts from "./Nuts";
import PositionTypeMarkers from "./PositionTypeMarkers";

import type { Hold } from "../_lib/types/Hold";

export default function BoardPanelGroup({
  panelHeight,
  gripTypes,
  holds,
  xStart,
  yStart,
}: {
  panelHeight: number;
  gripTypes: number[];
  holds: Hold[];
  xStart: number;
  yStart: number;
}) {
  const hasTouchScreen = useHasTouchScreen();
  const { controlsMode } = useContext(ControlsModeContext);
  const [hoverIndicator, setHoverIndicator] = useState({
    visible: false,
    xPosition: xStart,
    yPosition: yStart,
  });

  return (
    <>
      <BoardPanel height={panelHeight} />
      <Nuts holds={holds} xStart={xStart} yStart={yStart} />
      <PositionTypeMarkers holds={holds} xStart={xStart} yStart={yStart} />

      {gripTypes.map((gripType) => (
        <Holds
          key={gripType}
          gripType={gripType}
          holds={holds}
          xStart={xStart}
          yStart={yStart}
        />
      ))}

      {controlsMode === "edit" && (
        <>
          <InteractivePlanes
            holds={holds}
            xStart={xStart}
            yStart={yStart}
            setHoverIndicator={setHoverIndicator}
          />

          {!hasTouchScreen && (
            <HoverIndicator
              visible={hoverIndicator.visible}
              position={[
                hoverIndicator.xPosition,
                hoverIndicator.yPosition,
                BOARD_THICKNESS / 2 + 0.005,
              ]}
            />
          )}
        </>
      )}
    </>
  );
}
