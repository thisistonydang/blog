import { useContext } from "react";

import { CurrentProblemContext } from "../_context/CurrentProblemContext";
import PositionTypeMarker from "./PositionTypeMarker";

import type { Hold } from "../_lib/types/Hold";

export default function PositionTypeMarkers({
  holds,
  xStart,
  yStart,
}: {
  holds: Hold[];
  xStart: number;
  yStart: number;
}) {
  const { currentProblem } = useContext(CurrentProblemContext);

  return (
    <>
      {currentProblem.start.length ? (
        <PositionTypeMarker
          position="start"
          holds={holds.filter(({ id }) => currentProblem.start.includes(id))}
          xStart={xStart}
          yStart={yStart}
          rotation={Math.PI * 0.25}
        />
      ) : (
        <></>
      )}
      {currentProblem.middle.length ? (
        <PositionTypeMarker
          position="middle"
          holds={holds.filter(({ id }) => currentProblem.middle.includes(id))}
          xStart={xStart}
          yStart={yStart}
          rotation={0}
        />
      ) : (
        <></>
      )}
      {currentProblem.footOnly.length ? (
        <PositionTypeMarker
          position="footOnly"
          holds={holds.filter(({ id }) => currentProblem.footOnly.includes(id))}
          xStart={xStart}
          yStart={yStart}
          rotation={0}
        />
      ) : (
        <></>
      )}
      {currentProblem.finish.length ? (
        <PositionTypeMarker
          position="finish"
          holds={holds.filter(({ id }) => currentProblem.finish.includes(id))}
          xStart={xStart}
          yStart={yStart}
          rotation={Math.PI * -0.165}
        />
      ) : (
        <></>
      )}
    </>
  );
}
