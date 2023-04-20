import { useSyncExternalStore } from "react";

// @ts-expect-error svelte import
import { THEME_TOGGLED_EVENT } from "@layouts/page/_components/DarkModeToggle.svelte";

/**
 * Return the current theme in localStorage.
 */
export function useTheme(): "light" | "dark" {
  const theme = useSyncExternalStore(subscribe, getSnapshot);
  return theme;
}

function subscribe(callback: () => void): () => void {
  window.addEventListener(THEME_TOGGLED_EVENT, callback);

  return () => {
    window.removeEventListener(THEME_TOGGLED_EVENT, callback);
  };
}

function getSnapshot(): "light" | "dark" {
  return localStorage.theme === "dark" ? "dark" : "light";
}
