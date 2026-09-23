<script lang="ts">
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";

  import { theme } from "@layouts/page/_stores/theme";

  import { startCompetitiveAttempt } from "../_competitive/client";
  import {
    app,
    gameState,
    interfaceState,
    isFullscreen,
  } from "../_stores/appState";
  import { App } from "../_world/App";

  let container: HTMLDivElement;

  async function handleMouseDown() {
    if (!["closed", "opened"].includes($interfaceState)) {
      // Close the currently opened interface dialog
      $interfaceState = "opened";
    } else if ($gameState === "not_started") {
      if (await startCompetitiveAttempt()) $app?.startGame();
    } else if ($gameState === "playing") {
      $app?.jump();
    }
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.code === "Space" || e.key === " ") {
      handleMouseDown();
    }
  }

  onMount(() => {
    // Create and render game app
    const gameApp = new App(container);
    $app = gameApp;
    gameApp.requestRender();

    // Add event listeners to canvas
    const canvas = gameApp.renderer.domElement;
    canvas.tabIndex = 0; // Allow canvas to be focusable
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("keydown", handleKeyDown);

    const handleWebkitFullscreenChange = () => {
      if ("webkitFullscreenElement" in document) {
        $isFullscreen = Boolean(document.webkitFullscreenElement);
      }
    };
    if ("webkitFullscreenElement" in document) {
      container.addEventListener("webkitfullscreenchange", handleWebkitFullscreenChange);
    }

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("keydown", handleKeyDown);
      container.removeEventListener("webkitfullscreenchange", handleWebkitFullscreenChange);
      gameApp.dispose();
      if ($app === gameApp) $app = undefined;
    };
  });

  $: if ($theme) $app?.requestRender();
</script>

<div
  bind:this={container}
  in:fade={{ duration: 5000 }}
  class="bg-bg h-screen w-screen"
  on:fullscreenchange={() => {
    $isFullscreen = Boolean(document.fullscreenElement);
  }}
/>
