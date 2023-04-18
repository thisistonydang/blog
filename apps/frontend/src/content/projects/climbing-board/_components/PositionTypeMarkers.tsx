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

  return (
    <>
      {currentProblem.start.length ? (
        <PositionTypeMarker
          geometry={squareRingGeometry}
          rotation={Math.PI * 0.25}
          markerColor={bright.green}
          holds={holds.filter(({ id }) => currentProblem.start.includes(id))}
          xStart={xStart}
          yStart={yStart}
        />
      ) : (
        <></>
      )}
      {currentProblem.middle.length ? (
        <PositionTypeMarker
          geometry={ringGeometry}
          rotation={0}
          markerColor={bright.blue}
          holds={holds.filter(({ id }) => currentProblem.middle.includes(id))}
          xStart={xStart}
          yStart={yStart}
        />
      ) : (
        <></>
      )}
      {currentProblem.footOnly.length ? (
        <PositionTypeMarker
          geometry={squareRingGeometry}
          rotation={0}
          markerColor={bright.yellow}
          holds={holds.filter(({ id }) => currentProblem.footOnly.includes(id))}
          xStart={xStart}
          yStart={yStart}
        />
      ) : (
        <></>
      )}
      {currentProblem.finish.length ? (
        <PositionTypeMarker
          geometry={triangleRingGeometry}
          rotation={Math.PI * -0.165}
          markerColor={bright.purple}
          holds={holds.filter(({ id }) => currentProblem.finish.includes(id))}
          xStart={xStart}
          yStart={yStart}
        />
      ) : (
        <></>
      )}
    </>
  );
}
