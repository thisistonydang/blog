import { createContext } from "react";
import type { Dispatch, MutableRefObject, SetStateAction } from "react";

export type BoardAngle =
  | 0
  | 5
  | 10
  | 15
  | 20
  | 25
  | 30
  | 35
  | 40
  | 45
  | 50
  | 55
  | 60
  | 65
  | 70;

export const ALLOWED_ANGLES = [
  0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70,
];

export function isBoardAngle(angle: number): angle is BoardAngle {
  return ALLOWED_ANGLES.includes(angle);
}

export const BoardAngleContext = createContext(
  {} as {
    boardAngle: BoardAngle;
    setBoardAngle: Dispatch<SetStateAction<BoardAngle>>;
    prevBoardAngle: MutableRefObject<BoardAngle>;
  }
);
