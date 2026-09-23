<script lang="ts">
  import { onMount } from "svelte";

  import { getParsedValue } from "@lib/local-storage/getParsedValue";

  import {
    gameState,
    isMuted,
    soundToggled,
    visited,
  } from "../_stores/appState";

  const LOCAL_STORAGE_KEY = "possible_game";
  const LOCAL_STORAGE_VERSION = "2023-05-27";
  let mounted = false;

  function updateLocalStorage([
    objectKey,
    newValue,
  ]: ["isMuted" | "soundToggled" | "visited", boolean]): void {
    const data = getParsedValue(LOCAL_STORAGE_KEY, LOCAL_STORAGE_VERSION);

    data[objectKey] = newValue;
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  }

  onMount(() => {
    const data = getParsedValue(LOCAL_STORAGE_KEY, LOCAL_STORAGE_VERSION);
    if (typeof data.isMuted === "boolean") $isMuted = data.isMuted;
    if (typeof data.soundToggled === "boolean")
      $soundToggled = data.soundToggled;
    if (typeof data.visited === "boolean") $visited = data.visited;

    mounted = true;
  });

  $: if (mounted) updateLocalStorage(["isMuted", $isMuted]);
  $: if (mounted) updateLocalStorage(["soundToggled", $soundToggled]);
  $: if (mounted) updateLocalStorage(["visited", $visited]);

  // Set visited state to true if user has played a game
  $: if (["stopped", "ended"].includes($gameState)) $visited = true;
</script>
