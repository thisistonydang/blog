// Camera
export const DEFAULT_CAMERA_FOV = 50;

// Board
export const BOARD_THICKNESS = 2 / 12; // Arbitrary thickness for aesthetics
export const HORIZONTAL_STIFFENER_SIZE = 4 / 12; // 4" Square tube
export const HOLD_SPACING = 0.65625; // Moonboard hold spacing

export const MAX_BOARD_HEIGHT = 15; // 15 ft max for safety
export const MAIN_BOARD_HEIGHT = 12; // Standard 12ft height
export const KICK_BOARD_HEIGHT = MAX_BOARD_HEIGHT - MAIN_BOARD_HEIGHT;

export const MAIN_BOARD_ROWS = Math.floor(MAIN_BOARD_HEIGHT / HOLD_SPACING - 1);
export const KICK_BOARD_ROWS = 2;

export const ALPHABET = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"]; // Max columns
export const NUM_GRIP_TYPES = 4;

// Crash pad
export const CRASH_PAD_DEPTH = MAX_BOARD_HEIGHT;
export const CRASH_PAD_HEIGHT = MAX_BOARD_HEIGHT / 12; // 1" per feet of max height
export const BOARD_TO_PAD_GAP = 1 / 12;
