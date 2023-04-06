import { useContext } from "react";

import ControlsDialog from "@lib/components/ControlsDialog";
import IconButton from "@lib/components/IconButton";

import { ControlsModeContext } from "../_context/ControlsModeContext";

import ControlsList from "./ControlsList";

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
          <li>Board width adjustment from 8 to 12 ft</li>
          <li>Board angle adjustment from 0 to 70&deg;</li>
          <li>Problem selection from list of psuedo problems</li>
          <li>Custom problem setting</li>
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
