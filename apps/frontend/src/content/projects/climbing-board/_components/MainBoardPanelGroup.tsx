import { useContext, useMemo } from "react";

import { BoardWidthContext } from "../_context/BoardWidthContext";

import {
  ALPHABET,
  HOLD_SPACING,
  MAIN_BOARD_HEIGHT,
  MAIN_BOARD_ROWS,
  NUM_GRIP_TYPES,
} from "../_lib/constants/constants.js";

import allHolds from "../_data/holds.json";

import BoardPanelGroup from "./BoardPanelGroup";

import type { Hold } from "../_lib/types/Hold";

export default function MainBoardPanelGroup() {
  const { boardWidth } = useContext(BoardWidthContext);

  const { holds, xStart, yStart } = useMemo(() => {
    // Determine columns based off boardWidth
    const columns = ALPHABET.slice(
      0,
      Math.floor(boardWidth / HOLD_SPACING) - 1
    );

    // Get MainBoard holds
    const holds: Hold[] = allHolds.filter((hold) => {
      for (const column of columns) {
        if (hold.column === column && ![1, 2].includes(hold.row)) return true;
      }
      return false;
    });

    // A3 hold position
    const xPadding = (boardWidth - (columns.length - 1) * HOLD_SPACING) / 2;
    const yPadding =
      (MAIN_BOARD_HEIGHT - (MAIN_BOARD_ROWS - 1) * HOLD_SPACING) / 2;
    const { xStart, yStart } = {
      xStart: -boardWidth / 2 + xPadding,
      yStart: -MAIN_BOARD_HEIGHT / 2 + yPadding - 2 * HOLD_SPACING,
    };

    return { holds, xStart, yStart };
  }, [boardWidth]);

  return (
    <BoardPanelGroup
      groupPosition={[0, MAIN_BOARD_HEIGHT / 2, 0]}
      panelHeight={MAIN_BOARD_HEIGHT}
      gripTypes={[...Array(NUM_GRIP_TYPES).keys()]}
      holds={holds}
      xStart={xStart}
      yStart={yStart}
    />
  );
}
