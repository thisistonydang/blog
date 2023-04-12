import { createContext } from "react";
import type { Dispatch, SetStateAction } from "react";

export interface Problem {
  name: string;
  grade: number;
  start: string[];
  middle: string[];
  footOnly: string[];
  finish: string[];
}

export const CurrentProblemContext = createContext(
  {} as {
    currentProblem: Problem;
    setCurrentProblem: Dispatch<SetStateAction<Problem>>;
  }
);
