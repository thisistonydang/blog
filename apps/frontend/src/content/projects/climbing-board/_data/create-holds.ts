import { writeFile } from "fs";

import {
  ALPHABET,
  HOLD_SPACING,
  KICK_BOARD_ROWS,
  MAIN_BOARD_ROWS,
  NUM_GRIP_TYPES,
} from "../_lib/constants/constants.js";

import type { Hold } from "../_lib/types/Hold";

const TOTAL_ROWS = MAIN_BOARD_ROWS + KICK_BOARD_ROWS;
const holds: Hold[] = [];

for (const [index, column] of ALPHABET.entries()) {
  for (let row = 1; row <= TOTAL_ROWS; row++) {
    // Set grip type
    let gripType;
    if (row === TOTAL_ROWS) {
      gripType = 0;
    } else if (row === TOTAL_ROWS - 1 || row === TOTAL_ROWS - 2) {
      gripType = Math.floor(Math.random() * (NUM_GRIP_TYPES - 1));
    } else if (row === 1 || row === 2) {
      gripType = NUM_GRIP_TYPES - 1;
    } else {
      gripType = Math.floor(Math.random() * NUM_GRIP_TYPES);
    }

    // Set rotaion
    let rotation;
    if (row === TOTAL_ROWS) {
      rotation = ((Math.random() - 0.5) * Math.PI) / 2;
    } else {
      rotation = Math.random() * 2 * Math.PI;
    }

    holds.push({
      id: `${column}-${row}`,
      column,
      row,
      gripType,
      rotation,
      xOffset: index * HOLD_SPACING,
      yOffset: (row - 1) * HOLD_SPACING,
    });
  }
}

const json = JSON.stringify(holds);
const file = "holds.json";
writeFile(file, json, "utf8", (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Holds written to: ${file}`);
  }
});
