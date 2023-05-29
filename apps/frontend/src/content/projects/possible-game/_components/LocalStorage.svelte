<script lang="ts">
  import { onMount } from "svelte";

  import { getParsedValue } from "@lib/local-storage/getParsedValue";

  import {
    attempts,
    currentStreak,
    finishes,
    gameState,
    isMuted,
    longestStreak,
    visited,
  } from "../_stores/appState";

  const LOCAL_STORAGE_KEY = "possible_game";
  const LOCAL_STORAGE_VERSION = "2023-05-27";
  let mounted = false;

  function isValidCount(value: unknown): boolean {
    return typeof value === "number" && Number.isInteger(value) && value >= 0;
  }

  function updateLocalStorage([objectKey, newValue]:
    | ["attempts" | "finishes" | "currentStreak" | "longestStreak", number]
    | ["isMuted" | "visited", boolean]): void {
    const data = getParsedValue(LOCAL_STORAGE_KEY, LOCAL_STORAGE_VERSION);

    // Update stored data object with new value.
    data[objectKey] = newValue;
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  }

  // Sync app state with local storage on start up
  onMount(() => {
    const data = getParsedValue(LOCAL_STORAGE_KEY, LOCAL_STORAGE_VERSION);
    if (isValidCount(data.attempts)) $attempts = data.attempts;
    if (isValidCount(data.finishes)) $finishes = data.finishes;
    if (isValidCount(data.currentStreak)) $currentStreak = data.currentStreak;
    if (isValidCount(data.longestStreak)) $longestStreak = data.longestStreak;
    if (typeof data.isMuted === "boolean") $isMuted = data.isMuted;
    if (typeof data.visited === "boolean") $visited = data.visited;

    mounted = true;
  });

  // Keep local storage in sync with app state
  $: if (mounted) updateLocalStorage(["attempts", $attempts]);
  $: if (mounted) updateLocalStorage(["finishes", $finishes]);
  $: if (mounted) updateLocalStorage(["currentStreak", $currentStreak]);
  $: if (mounted) updateLocalStorage(["longestStreak", $longestStreak]);
  $: if (mounted) updateLocalStorage(["isMuted", $isMuted]);
  $: if (mounted) updateLocalStorage(["visited", $visited]);

  // Set visited state to true if user has played a game
  $: if (["stopped", "ended"].includes($gameState)) $visited = true;
</script>
