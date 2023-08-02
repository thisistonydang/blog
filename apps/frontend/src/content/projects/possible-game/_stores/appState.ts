import { writable } from "svelte/store";
import type { App } from "../_world/App";

export const app = writable<App | undefined>(undefined);

export const gameState = writable<
  "not_started" | "playing" | "stopped" | "ended"
>("not_started");

export const interfaceState = writable<
  "closed" | "opened" | "credits" | "how_to_play" | "stats" | "welcome"
>("closed");

export const isFullscreen = writable(false);

// Audio
export const scoreAudioCanPlayThrough = writable<boolean>(false);
export const gameOverAudioCanPlayThrough = writable<boolean>(false);
export const levelAudioCanPlayThrough = writable<boolean>(false);

// Textures
export const playerImageLoaded = writable<boolean>(false);
export const playerImage = writable<HTMLImageElement | undefined>(undefined);
export const trapImageLoaded = writable<boolean>(false);
export const trapImage = writable<HTMLImageElement | undefined>(undefined);

// Local storage
export const attempts = writable<number>(0);
export const finishes = writable<number>(0);
export const currentStreak = writable<number>(0);
export const longestStreak = writable<number>(0);
export const isMuted = writable<boolean>(true);
export const soundToggled = writable<boolean>(false);
export const visited = writable<boolean>(false);
