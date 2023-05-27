import { useContext, useEffect, useState } from "react";

import { getParsedValue } from "@lib/local-storage/getParsedValue";
import Dialog from "@lib/react/components/Dialog";
import OrbitControlsInfo from "@lib/react/components/OrbitControlsInfo";

import { ControlsModeContext } from "../_context/ControlsModeContext";
import {
  LOCAL_STORAGE_KEY,
  LOCAL_STORAGE_VERSION,
  updateLocalStorage,
} from "../_hooks/useSyncLocalStorage";

import type { MouseEvent } from "react";

export default function FirstVisitModal() {
  const { setControlsMode } = useContext(ControlsModeContext);
  const [hasVisited, setHasVisited] = useState(true);

  useEffect(() => {
    const data = getParsedValue(LOCAL_STORAGE_KEY, LOCAL_STORAGE_VERSION);

    if (data.visited) {
      setControlsMode("opened");
    } else {
      setHasVisited(false);
    }
  }, [hasVisited, setControlsMode]);

  function handleButtonClick(e: MouseEvent): void {
    e.preventDefault();
    updateLocalStorage(["visited", true]);
    setHasVisited(true);
  }

  return hasVisited ? (
    <></>
  ) : (
    <Dialog
      isModal
      hasPadding
      buttonText="GOT IT"
      onButtonClick={handleButtonClick}
    >
      <OrbitControlsInfo />
    </Dialog>
  );
}
