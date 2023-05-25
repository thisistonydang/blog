import { useContext } from "react";

import ControlsList from "@lib/react/components/ControlsList";
import IconButton from "@lib/react/components/IconButton";
import CheckMarkIcon from "@lib/react/svg/CheckMarkIcon";

import { ControlsModeContext } from "../_context/ControlsModeContext";
import { CurrentProblemContext } from "../_context/CurrentProblemContext";
import { updateLocalStorage } from "../_hooks/useSyncLocalStorage";

import { unSetProblem } from "./ContextProvider";

export default function EditControls() {
  const { setControlsMode } = useContext(ControlsModeContext);
  const { currentProblem, setCurrentProblem } = useContext(
    CurrentProblemContext
  );

  return (
    <ControlsList>
      <li>
        <IconButton
          isPill
          disabled={
            currentProblem.start.length === 0 &&
            currentProblem.middle.length === 0 &&
            currentProblem.footOnly.length === 0 &&
            currentProblem.finish.length === 0
          }
          onClick={() => {
            updateLocalStorage(["problem", unSetProblem]);
            setCurrentProblem(unSetProblem);
          }}
        >
          Clear Holds
        </IconButton>
      </li>
      <li>
        <IconButton
          ariaLabel="Exit problem setting mode."
          onClick={() => {
            setControlsMode("transitioning_to_opened");
          }}
        >
          <CheckMarkIcon />
        </IconButton>
      </li>
    </ControlsList>
  );
}
