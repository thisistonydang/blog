import { createContext } from "react";
import type { Dispatch, SetStateAction } from "react";

export type ControlsMode =
  | "closed"
  | "opened"
  | "info"
  | "width"
  | "angle"
  | "browse"
  | "edit"
  | "transitioning_to_opened"
  | "transitioning_to_browse"
  | "transitioning_to_edit";

export const ControlsModeContext = createContext(
  {} as {
    controlsMode: ControlsMode;
    setControlsMode: Dispatch<SetStateAction<ControlsMode>>;
  }
);
