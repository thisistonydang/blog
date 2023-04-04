import { createContext } from "react";
import type { Dispatch, SetStateAction } from "react";

export type BoardWidth = 8 | 10 | 12 | 14 | 16 | 18;

export const ALLOWED_WIDTHS = [8, 10, 12, 14, 16, 18];

export function isBoardWidth(width: number): width is BoardWidth {
  return ALLOWED_WIDTHS.includes(width);
}

export const BoardWidthContext = createContext(
  {} as {
    boardWidth: BoardWidth;
    setBoardWidth: Dispatch<SetStateAction<BoardWidth>>;
  }
);
