import { useContext } from "react";

import { bright } from "@lib/colors/paul-tol";
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
          holds={holds.filter(({ id }) => currentProblem.start.includes(id))}
          xStart={xStart}
          yStart={yStart}
          color={bright.green}
          rotation={Math.PI * 0.25}
          segments={4}
        />
      ) : (
        <></>
      )}
      {currentProblem.middle.length ? (
        <PositionTypeMarker
          holds={holds.filter(({ id }) => currentProblem.middle.includes(id))}
          xStart={xStart}
          yStart={yStart}
          color={bright.blue}
          rotation={0}
          segments={32}
        />
      ) : (
        <></>
      )}
      {currentProblem.footOnly.length ? (
        <PositionTypeMarker
          holds={holds.filter(({ id }) => currentProblem.footOnly.includes(id))}
          xStart={xStart}
          yStart={yStart}
          color={bright.yellow}
          rotation={0}
          segments={4}
        />
      ) : (
        <></>
      )}
      {currentProblem.finish.length ? (
        <PositionTypeMarker
          holds={holds.filter(({ id }) => currentProblem.finish.includes(id))}
          xStart={xStart}
          yStart={yStart}
          color={bright.purple}
          rotation={Math.PI * -0.165}
          segments={3}
        />
      ) : (
        <></>
      )}
    </>
  );
}
