import { useRef, useState } from "react";

import { BoardAngleContext } from "../_context/BoardAngleContext";
import { BoardWidthContext } from "../_context/BoardWidthContext";
import { ControlsModeContext } from "../_context/ControlsModeContext";
import { CurrentProblemContext } from "../_context/CurrentProblemContext";

import allProblems from "../_data/problems.json";

import { useSyncLocalStorage } from "../_hooks/useSyncLocalStorage";

import type { BoardAngle } from "../_context/BoardAngleContext";
import type { BoardWidth } from "../_context/BoardWidthContext";
import type { ControlsMode } from "../_context/ControlsModeContext";
import type { Problem } from "../_context/CurrentProblemContext";

export const unSetProblem = {
  name: "",
  grade: -1,
  start: [],
  middle: [],
  footOnly: [],
  finish: [],
};

export default function ContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Set inital board angle.
  const INTIAL_ANGLE = 40;
  const [boardAngle, setBoardAngle] = useState<BoardAngle>(INTIAL_ANGLE);
  const prevBoardAngle = useRef<BoardAngle>(INTIAL_ANGLE);

  // Set initial board width.
  const INTIAL_WIDTH = 12;
  const [boardWidth, setBoardWidth] = useState<BoardWidth>(INTIAL_WIDTH);

  // Set inital controls mode.
  const [controlsMode, setControlsMode] = useState<ControlsMode>("closed");

  // Set inital problem.
  const tres = allProblems.find((problem) => {
    return problem.width === INTIAL_WIDTH && problem.name === "Tres";
  });
  const [currentProblem, setCurrentProblem] = useState<Problem>(
    tres ? tres : unSetProblem
  );

  useSyncLocalStorage(setBoardAngle, setBoardWidth, setCurrentProblem);

  return (
    <BoardAngleContext.Provider
      value={{ boardAngle, setBoardAngle, prevBoardAngle }}
    >
      <BoardWidthContext.Provider value={{ boardWidth, setBoardWidth }}>
        <ControlsModeContext.Provider value={{ controlsMode, setControlsMode }}>
          <CurrentProblemContext.Provider
            value={{ currentProblem, setCurrentProblem }}
          >
            {children}
          </CurrentProblemContext.Provider>
        </ControlsModeContext.Provider>
      </BoardWidthContext.Provider>
    </BoardAngleContext.Provider>
  );
}
