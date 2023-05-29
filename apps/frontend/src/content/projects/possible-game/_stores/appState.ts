import { writable } from "svelte/store";
import type { App } from "../_world/App";

export const app = writable<App>(undefined);

export const gameState = writable<
  "not_started" | "playing" | "stopped" | "ended"
>("not_started");

export const interfaceState = writable<
  "closed" | "opened" | "credits" | "how_to_play" | "stats" | "welcome"
>("closed");

export const isFullscreen = writable(false);

export const scoreAudioCanPlayThrough = writable<boolean>(false);
export const gameOverAudioCanPlayThrough = writable<boolean>(false);
export const levelAudioCanPlayThrough = writable<boolean>(false);

// Local storage
export const attempts = writable<number>(0);
export const finishes = writable<number>(0);
export const currentStreak = writable<number>(0);
export const longestStreak = writable<number>(0);
export const isMuted = writable<boolean>(false);
export const visited = writable<boolean>(false);
