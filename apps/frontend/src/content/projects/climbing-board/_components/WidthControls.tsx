import { useContext } from "react";

import ControlsList from "@lib/react/components/ControlsList";
import IconButton from "@lib/components/IconButton";
import CheckMarkIcon from "@lib/svg/CheckMarkIcon";

import {
  ALLOWED_WIDTHS,
  BoardWidthContext,
  isBoardWidth,
} from "../_context/BoardWidthContext";
import { ControlsModeContext } from "../_context/ControlsModeContext";
import { CurrentProblemContext } from "../_context/CurrentProblemContext";

import allProblems from "../_data/problems.json";
import { updateLocalStorage } from "../_hooks/useSyncLocalStorage";

import ControlsDisplay from "./ControlsDisplay";
import { unSetProblem } from "./ContextProvider";

export default function WidthControls() {
  const { boardWidth, setBoardWidth } = useContext(BoardWidthContext);
  const { setControlsMode } = useContext(ControlsModeContext);
  const { setCurrentProblem } = useContext(CurrentProblemContext);

  function updateBoardWidth(width: number): void {
    // Confirm width is within allowed range.
    const newWidth = isBoardWidth(width) ? width : 12;

    // Find a problem at the new width.
    const problem = allProblems.find((problem) => problem.width === newWidth);
    const newProblem = problem ? problem : unSetProblem;

    // Update localStorage and app state with new width and problem.
    updateLocalStorage(["width", newWidth]);
    updateLocalStorage(["problem", newProblem]);
    setBoardWidth(newWidth);
    setCurrentProblem(newProblem);
  }

  return (
    <ControlsList>
      <li>
        <ControlsDisplay width={80}>{boardWidth} ft</ControlsDisplay>
      </li>
      <li>
        <IconButton
          ariaLabel="Decrease board width by 2 feet."
          disabled={boardWidth === ALLOWED_WIDTHS[0]}
          onClick={() => updateBoardWidth(boardWidth - 2)}
        >
          &#8722;
        </IconButton>
      </li>
      <li>
        <IconButton
          ariaLabel="Increase board width by 2 feet."
          disabled={boardWidth === ALLOWED_WIDTHS.at(-1)}
          onClick={() => updateBoardWidth(boardWidth + 2)}
        >
          &#43;
        </IconButton>
      </li>
      <li>
        <IconButton
          ariaLabel="Hide width controls."
          onClick={() => setControlsMode("opened")}
        >
          <CheckMarkIcon />
        </IconButton>
      </li>
    </ControlsList>
  );
}
