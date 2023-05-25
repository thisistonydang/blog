import { useContext } from "react";

import ControlsList from "@lib/react/components/ControlsList";
import IconButton from "@lib/react/components/IconButton";
import CheckMarkIcon from "@lib/react/svg/CheckMarkIcon";

import {
  ALLOWED_ANGLES,
  BoardAngleContext,
  isBoardAngle,
} from "../_context/BoardAngleContext";
import { ControlsModeContext } from "../_context/ControlsModeContext";

import { updateLocalStorage } from "../_hooks/useSyncLocalStorage";

import ControlsDisplay from "./ControlsDisplay";

export default function AngleControls() {
  const { boardAngle, setBoardAngle } = useContext(BoardAngleContext);
  const { setControlsMode } = useContext(ControlsModeContext);

  function updateBoardAngle(angle: number): void {
    // Confirm angle is within allowed range.
    const newAngle = isBoardAngle(angle) ? angle : 40;

    // Update localStorage and app state with new angle.
    updateLocalStorage(["angle", newAngle]);
    setBoardAngle(newAngle);
  }

  return (
    <ControlsList>
      <li>
        <ControlsDisplay width={64}>{boardAngle}&deg;</ControlsDisplay>
      </li>
      <li>
        <IconButton
          ariaLabel="Decrease board angle by 5 degrees."
          disabled={boardAngle === ALLOWED_ANGLES[0]}
          onClick={() => updateBoardAngle(boardAngle - 5)}
        >
          &#8722;
        </IconButton>
      </li>
      <li>
        <IconButton
          ariaLabel="Increase board angle by 5 degrees."
          disabled={boardAngle === ALLOWED_ANGLES.at(-1)}
          onClick={() => updateBoardAngle(boardAngle + 5)}
        >
          &#43;
        </IconButton>
      </li>
      <li>
        <IconButton
          ariaLabel="Hide angle controls."
          onClick={() => setControlsMode("opened")}
        >
          <CheckMarkIcon />
        </IconButton>
      </li>
    </ControlsList>
  );
}
