import { useEffect } from "react";
import { getParsedValue } from "@lib/local-storage/getParsedValue";
import { isBoardAngle } from "../_context/BoardAngleContext";
import { isBoardWidth } from "../_context/BoardWidthContext";

import type { Dispatch, SetStateAction } from "react";
import type { BoardAngle } from "../_context/BoardAngleContext";
import type { BoardWidth } from "../_context/BoardWidthContext";
import type { Problem } from "../_context/CurrentProblemContext";

export const LOCAL_STORAGE_KEY = "climbing_board";
export const LOCAL_STORAGE_VERSION = "2023-04-05";

/**
 * Sync app state with localStorage.
 */
export function useSyncLocalStorage(
  setBoardAngle: Dispatch<SetStateAction<BoardAngle>>,
  setBoardWidth: Dispatch<SetStateAction<BoardWidth>>,
  setCurrentProblem: Dispatch<SetStateAction<Problem>>
) {
  useEffect(() => {
    const data = getParsedValue(LOCAL_STORAGE_KEY, LOCAL_STORAGE_VERSION);

    if (isBoardAngle(data.angle)) setBoardAngle(data.angle);
    if (isBoardWidth(data.width)) setBoardWidth(data.width);
    if (data.problem) setCurrentProblem(data.problem); // TODO: Add typeguard
  }, [setBoardAngle, setBoardWidth, setCurrentProblem]);
}

/**
 * Update data object stored in localStorage.
 */
export function updateLocalStorage([objectKey, newValue]:
  | ["angle", BoardAngle]
  | ["width", BoardWidth]
  | ["problem", Problem]
  | ["visited", boolean]): void {
  const data = getParsedValue(LOCAL_STORAGE_KEY, LOCAL_STORAGE_VERSION);

  // Update stored data object with new value.
  data[objectKey] = newValue;
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
}
