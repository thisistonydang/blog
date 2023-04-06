import { useContext } from "react";

import ControlsDialog from "@lib/components/ControlsDialog";
import IconButton from "@lib/components/IconButton";

import { ALLOWED_ANGLES } from "../_context/BoardAngleContext";
import { ALLOWED_WIDTHS } from "../_context/BoardWidthContext";
import { ControlsModeContext } from "../_context/ControlsModeContext";

import ControlsList from "./ControlsList";
import InAppLink from "./InAppLink";

export default function InfoControls() {
  const { setControlsMode } = useContext(ControlsModeContext);

  return (
    <>
      <ControlsList>
        <li>
          <IconButton
            ariaLabel="Hide info."
            onClick={() => setControlsMode("opened")}
          >
            &#x2714;
          </IconButton>
        </li>
      </ControlsList>

      <ControlsDialog isProse>
        <h1>Climbing Board</h1>
        <p>Concept training board app for climbing. Features include:</p>
        <ul>
          <li>
            Board <InAppLink controlsMode="width">width adjustment</InAppLink>{" "}
            from {ALLOWED_WIDTHS[0]} to {ALLOWED_WIDTHS.at(-1)} ft
          </li>
          <li>
            Board <InAppLink controlsMode="angle">angle adjustment</InAppLink>{" "}
            from {ALLOWED_ANGLES[0]} to {ALLOWED_ANGLES.at(-1)}&deg;
          </li>
          <li>
            <InAppLink controlsMode="transitioning_to_browse">
              Problem selection
            </InAppLink>{" "}
            from list of psuedo problems
          </li>
          <li>
            Custom{" "}
            <InAppLink controlsMode="transitioning_to_edit">
              problem setting
            </InAppLink>
          </li>
        </ul>
        <p>
          Inspired by the{" "}
          <a href="https://settercloset.com/pages/the-kilter-board">Kilter</a>,{" "}
          <a href="https://tensionclimbing.com/">Tension</a>, and{" "}
          <a href="https://www.moonboard.com/">Moon</a> boards.
        </p>
        <small>
          Created with <a href="https://threejs.org/">three.js</a> and{" "}
          <a href="https://docs.pmnd.rs/react-three-fiber/getting-started/introduction">
            react-three-fiber
          </a>
          .
        </small>
        <br />
        <small>
          <b>Code:</b>{" "}
          <a href="https://github.com/tonydangblog/blog/tree/main/apps/frontend/src/content/projects/climbing-board/_components">
            Github
          </a>
        </small>
      </ControlsDialog>
    </>
  );
}
