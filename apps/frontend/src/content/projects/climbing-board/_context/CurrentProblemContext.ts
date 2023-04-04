import { createContext } from "react";
import type { Dispatch, SetStateAction } from "react";

export interface Problem {
  name: string;
  grade: number;
  start: number[];
  middle: number[];
  footOnly: number[];
  finish: number[];
}

export const CurrentProblemContext = createContext(
  {} as {
    currentProblem: Problem;
    setCurrentProblem: Dispatch<SetStateAction<Problem>>;
  }
);
