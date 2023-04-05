import { useContext } from "react";

import IconButton from "@lib/components/IconButton";

import { BoardAngleContext } from "../_context/BoardAngleContext";
import { BoardWidthContext } from "../_context/BoardWidthContext";
import { ControlsModeContext } from "../_context/ControlsModeContext";
import { CurrentProblemContext } from "../_context/CurrentProblemContext";

import ControlsList from "./ControlsList";

export default function OpenedControls() {
  const { boardAngle } = useContext(BoardAngleContext);
  const { boardWidth } = useContext(BoardWidthContext);
  const { setControlsMode } = useContext(ControlsModeContext);
  const { currentProblem } = useContext(CurrentProblemContext);

  const name = currentProblem.name ? currentProblem.name : "Select Problem";
  const grade = currentProblem.grade === -1 ? "" : `V${currentProblem.grade}`;

  return (
    <ControlsList isVertical shiftUp>
      <li className="flex flex-wrap gap-2">
        <IconButton
          isPill
          onClick={() => setControlsMode("transitioning_to_browse")}
        >
          {name} {grade}
        </IconButton>
        <IconButton
          isPill
          onClick={() => setControlsMode("transitioning_to_edit")}
        >
          Set Problem
        </IconButton>
      </li>
      <li className="flex flex-wrap gap-2">
        <IconButton
          ariaLabel="Change board width."
          isPill
          onClick={() => setControlsMode("width")}
        >
          {boardWidth} ft
        </IconButton>
        <IconButton
          ariaLabel="Change board angle."
          isPill
          onClick={() => setControlsMode("angle")}
        >
          {boardAngle}&deg;
        </IconButton>
      </li>
      <li>
        <IconButton
          ariaLabel="Show Info."
          onClick={() => setControlsMode("info")}
        >
          <span className="font-sans text-xl">?</span>
        </IconButton>
      </li>
    </ControlsList>
  );
}
