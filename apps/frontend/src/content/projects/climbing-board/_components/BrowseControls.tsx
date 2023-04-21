import { useContext, useState } from "react";

import ControlsDialog from "@lib/components/ControlsDialog";
import IconButton from "@lib/components/IconButton";
import Prose from "@lib/components/Prose";

import { BoardWidthContext } from "../_context/BoardWidthContext";
import { ControlsModeContext } from "../_context/ControlsModeContext";
import { CurrentProblemContext } from "../_context/CurrentProblemContext";
import allProblems from "../_data/problems.json";
import { updateLocalStorage } from "../_hooks/useSyncLocalStorage";

import ControlsList from "./ControlsList";

export default function BrowseControls() {
  const { boardWidth } = useContext(BoardWidthContext);
  const { setControlsMode } = useContext(ControlsModeContext);
  const { currentProblem, setCurrentProblem } = useContext(
    CurrentProblemContext
  );
  const [showProblemsList, setShowProblemsList] = useState(true);

  const filteredProblems = allProblems.filter((problem) => {
    return problem.width === boardWidth;
  });

  return (
    <>
      {showProblemsList && (
        <ControlsDialog>
          <ul>
            {filteredProblems.map((problem) => (
              <li key={problem.name} className="px-2 first:pt-2 last:pb-2">
                <button
                  onClick={() => {
                    updateLocalStorage(["problem", problem]);
                    setCurrentProblem(problem);
                  }}
                >
                  <Prose>
                    <div
                      className={`
                        flex w-32 justify-between rounded border px-3 py-1
                        ${
                          currentProblem.name === problem.name
                            ? "border-text"
                            : "border-transparent"
                        }
                      `}
                    >
                      <div>{problem.name}</div>
                      <div>V{problem.grade}</div>
                    </div>
                  </Prose>
                </button>
              </li>
            ))}
          </ul>
        </ControlsDialog>
      )}

      <ControlsList>
        <li>
          <IconButton
            toggledText={<>Hide problems list</>}
            isToggled={showProblemsList}
            isPill
            fixedWidth={190}
            onClick={() => setShowProblemsList(!showProblemsList)}
          >
            Show problems list
          </IconButton>
        </li>
        <li>
          <IconButton
            ariaLabel="Hide browse controls."
            onClick={() => setControlsMode("transitioning_to_opened")}
          >
            &#x2714;
          </IconButton>
        </li>
      </ControlsList>
    </>
  );
}
