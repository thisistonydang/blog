import { useContext } from "react";
import { ControlsModeContext } from "../_context/ControlsModeContext";
import type { ControlsMode } from "../_context/ControlsModeContext";

export default function InAppLink({
  controlsMode,
  children,
}: {
  controlsMode: ControlsMode &
    ("angle" | "width" | "transitioning_to_browse" | "transitioning_to_edit");
  children: React.ReactNode;
}) {
  const { setControlsMode } = useContext(ControlsModeContext);

  return (
    <a
      href="/climbing-board"
      onClick={(e) => {
        e.preventDefault();
        setControlsMode(controlsMode);
      }}
    >
      {children}
    </a>
  );
}
