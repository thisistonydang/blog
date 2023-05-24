import { useSyncExternalStore } from "react";

let pixel_ratio: number;
let previous_width: number;
let previous_height: number;

/**
 * On window resize, return the current device pixel ratio if less than 2, else
 * return 2.
 */
export function usePixelRatio(): number {
  const pixel_ratio = useSyncExternalStore(subscribe, getSnapshot);
  return pixel_ratio;
}

function subscribe(callback: () => void): () => void {
  window.addEventListener("resize", callback);

  return () => {
    window.removeEventListener("resize", callback);
  };
}

function getSnapshot(): number {
  // Set initial pixel ratio, width, and height on first snapshot.
  if (!pixel_ratio || !previous_width || !previous_height) {
    pixel_ratio = Math.min(window.devicePixelRatio, 2);
    previous_width = window.innerWidth;
    previous_height = window.innerHeight;
    return pixel_ratio;
  }

  // If window has not been resized, do not update pixel ratio.
  const new_width = window.innerWidth;
  const new_height = window.innerHeight;
  if (new_width === previous_width && new_height === previous_height) {
    return pixel_ratio;
  }

  // If window has been resized, update pixel ratio.
  previous_width = new_width;
  previous_height = new_height;
  pixel_ratio = Math.min(window.devicePixelRatio, 2);
  return pixel_ratio;
}
