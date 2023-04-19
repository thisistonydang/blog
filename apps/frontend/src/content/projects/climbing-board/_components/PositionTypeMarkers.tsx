import { useContext } from "react";
import { RingGeometry } from "three";

import { bright } from "@lib/colors/paul-tol";
import { CurrentProblemContext } from "../_context/CurrentProblemContext";
import { ringGeometry } from "../_lib/geometries/ringGeometry.js";
import PositionTypeMarker from "./PositionTypeMarker";

import type { Hold } from "../_lib/types/Hold";

const triangleRingGeometry = new RingGeometry(0.3, 0.4, 3);
const squareRingGeometry = new RingGeometry(0.3, 0.4, 4);

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

  const startHolds = holds.filter(({ id }) =>
    currentProblem.start.includes(id)
  );
  const middleHolds = holds.filter(({ id }) =>
    currentProblem.middle.includes(id)
  );
  const footOnlyHolds = holds.filter(({ id }) =>
    currentProblem.footOnly.includes(id)
  );
  const finishHolds = holds.filter(({ id }) =>
    currentProblem.finish.includes(id)
  );

  return (
    <>
      {startHolds.length ? (
        <PositionTypeMarker
          geometry={squareRingGeometry}
          rotation={Math.PI * 0.25}
          markerColor={bright.green}
          holds={startHolds}
          xStart={xStart}
          yStart={yStart}
        />
      ) : (
        <></>
      )}
      {middleHolds.length ? (
        <PositionTypeMarker
          geometry={ringGeometry}
          rotation={0}
          markerColor={bright.blue}
          holds={middleHolds}
          xStart={xStart}
          yStart={yStart}
        />
      ) : (
        <></>
      )}
      {footOnlyHolds.length ? (
        <PositionTypeMarker
          geometry={squareRingGeometry}
          rotation={0}
          markerColor={bright.yellow}
          holds={footOnlyHolds}
          xStart={xStart}
          yStart={yStart}
        />
      ) : (
        <></>
      )}
      {finishHolds.length ? (
        <PositionTypeMarker
          geometry={triangleRingGeometry}
          rotation={Math.PI * -0.165}
          markerColor={bright.purple}
          holds={finishHolds}
          xStart={xStart}
          yStart={yStart}
        />
      ) : (
        <></>
      )}
    </>
  );
}
