import { useContext, useMemo } from "react";

import { BoardWidthContext } from "../_context/BoardWidthContext";

import {
  ALPHABET,
  BOARD_TO_PAD_GAP,
  CRASH_PAD_DEPTH,
  HOLD_SPACING,
  KICK_BOARD_HEIGHT,
  MAIN_BOARD_HEIGHT,
  MAIN_BOARD_ROWS,
} from "../_lib/constants/constants.js";

import allHolds from "../_data/holds.json";

import BoardPanelGroup from "./BoardPanelGroup";

import type { Hold } from "../_lib/types/Hold";

export default function KickBoardPanelGroup() {
  const { boardWidth } = useContext(BoardWidthContext);

  const { holds, xStart, yStart } = useMemo(() => {
    // Determine columns based off boardWidth
    const columns = ALPHABET.slice(
      0,
      Math.floor(boardWidth / HOLD_SPACING) - 1
    );

    // Get KickBoard holds
    const holds: Hold[] = allHolds.filter((hold) => {
      for (const column of columns) {
        if (hold.column === column && [1, 2].includes(hold.row)) return true;
      }
      return false;
    });

    // A1 hold position
    const xPadding = (boardWidth - (columns.length - 1) * HOLD_SPACING) / 2;
    const yPadding =
      (MAIN_BOARD_HEIGHT - (MAIN_BOARD_ROWS - 1) * HOLD_SPACING) / 4;
    const { xStart, yStart } = {
      xStart: -boardWidth / 2 + xPadding,
      yStart: KICK_BOARD_HEIGHT / 2 - HOLD_SPACING - yPadding,
    };

    return { holds, xStart, yStart };
  }, [boardWidth]);

  return (
    <BoardPanelGroup
      groupPosition={[
        0,
        KICK_BOARD_HEIGHT / 2,
        -CRASH_PAD_DEPTH / 2 - BOARD_TO_PAD_GAP,
      ]}
      panelHeight={KICK_BOARD_HEIGHT}
      holds={holds}
      xStart={xStart}
      yStart={yStart}
    />
  );
}
