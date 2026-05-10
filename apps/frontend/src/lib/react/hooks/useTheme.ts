import { useSyncExternalStore } from "react";

import { THEME_TOGGLED_EVENT } from "@layouts/page/_components/DarkModeToggle.events";

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
