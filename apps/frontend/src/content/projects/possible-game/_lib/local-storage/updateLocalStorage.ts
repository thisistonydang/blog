import { getParsedValue } from "@lib/local-storage/getParsedValue";

export const LOCAL_STORAGE_KEY = "possible_game";
export const LOCAL_STORAGE_VERSION = "2023-05-27";

/**
 * Update data object stored in localStorage.
 */
export function updateLocalStorage([objectKey, newValue]:
  | ["attempts" | "finishes" | "currentStreak" | "longestStreak", number]
  | ["visited", boolean]): void {
  const data = getParsedValue(LOCAL_STORAGE_KEY, LOCAL_STORAGE_VERSION);

  // Update stored data object with new value.
  data[objectKey] = newValue;
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
}
