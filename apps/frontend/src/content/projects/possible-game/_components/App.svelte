<script lang="ts">
  import { onMount } from "svelte";

  import { getParsedValue } from "@lib/local-storage/getParsedValue";

  import {
    LOCAL_STORAGE_KEY,
    LOCAL_STORAGE_VERSION,
    updateLocalStorage,
  } from "../_lib/local-storage/updateLocalStorage";
  import {
    attempts,
    currentStreak,
    finishes,
    gameState,
    interfaceState,
    isFullscreen,
    longestStreak,
    visited,
  } from "../_stores/appState";
  import { App } from "../_world/App";

  import Interface from "./Interface.svelte";
  import RestartDialog from "./RestartDialog.svelte";

  let container: HTMLDivElement;
  let canvas: HTMLCanvasElement;
  let app: App;

  $: if ($isFullscreen) container.requestFullscreen();

  // Set visited state to true if user has played a game
  $: if (["stopped", "ended"].includes($gameState) && !$visited) {
    $visited = true;
    updateLocalStorage(["visited", true]);
  }

  function handleMouseDown() {
    if (!["closed", "opened"].includes($interfaceState)) {
      // Close the currently opened interface dialog
      $interfaceState = "opened";
    } else if ($gameState === "not_started") {
      app.startGame();
    } else if ($gameState === "playing") {
      app.jump();
    }
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.code === "Space" || e.key === " ") {
      handleMouseDown();
    }
  }

  onMount(() => {
    // Sync game stats with local storage
    function isValid(value: unknown): boolean {
      return typeof value === "number" && Number.isInteger(value) && value > 0;
    }
    const data = getParsedValue(LOCAL_STORAGE_KEY, LOCAL_STORAGE_VERSION);
    if (isValid(data.attempts)) $attempts = data.attempts;
    if (isValid(data.finishes)) $finishes = data.finishes;
    if (isValid(data.currentStreak)) $currentStreak = data.currentStreak;
    if (isValid(data.longestStreak)) $longestStreak = data.longestStreak;

    // Create and render game app
    app = new App(container);
    app.requestRender();

    // Add event listeners to canvas
    canvas = app.renderer.domElement;
    canvas.tabIndex = 0; // Allow canvas to be focusable
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("keydown", handleKeyDown);
  });
</script>

<div
  bind:this={container}
  class="h-screen w-screen animate-[fade-in_10s]"
  on:fullscreenchange={() => {
    $isFullscreen = Boolean(document.fullscreenElement);
  }}
/>

{#if $gameState === "not_started"}
  <Interface />
{:else if $gameState === "stopped"}
  <RestartDialog title="You died :(" {app} />
{:else if $gameState === "ended"}
  <RestartDialog title="You won!" {app} />
{/if}
