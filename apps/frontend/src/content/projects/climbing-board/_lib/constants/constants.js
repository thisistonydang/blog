// Camera
export const DEFAULT_CAMERA_FOV = 50;

// Board
export const MAX_BOARD_HEIGHT = 15; // 15 ft max for safety
export const MAIN_BOARD_HEIGHT = 13.25;
export const BOARD_THICKNESS = 2 / 12;

// Main board
export const HOLD_SPACING = 0.65625; // Moonboard hold spacing.
export const MAX_ROWS = Math.floor(MAIN_BOARD_HEIGHT / HOLD_SPACING - 1);
export const alphabet = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"]; // Max columns
export const NUM_GRIP_TYPES = 4;

// Crash pad
export const BOARD_TO_PAD_GAP = 1 / 12;
