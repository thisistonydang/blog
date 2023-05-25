import { writable } from "svelte/store";

export const gameState = writable<
  "not_started" | "playing" | "stopped" | "ended"
>("not_started");

export const interfaceState = writable<
  "closed" | "opened" | "credits" | "how_to_play"
>("closed");

export const isFullscreen = writable(false);

// Start isMuted as undefined so sound doesn't play on start up
export const isMuted = writable<boolean>(undefined);
