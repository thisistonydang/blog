<script lang="ts">
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";

  import { theme } from "@layouts/page/_stores/theme";
  import { requestFullscreen } from "@lib/fullscreen/requestFullscreen";

  import {
    app,
    gameState,
    interfaceState,
    isFullscreen,
  } from "../_stores/appState";

  import { App } from "../_world/App";

  let container: HTMLDivElement;

  function handleMouseDown() {
    if (!["closed", "opened"].includes($interfaceState)) {
      // Close the currently opened interface dialog
      $interfaceState = "opened";
    } else if ($gameState === "not_started") {
      $app?.startGame();
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
    $app = new App(container);
    $app.requestRender();

    // Add event listeners to canvas
    const canvas = $app.renderer.domElement;
    canvas.tabIndex = 0; // Allow canvas to be focusable
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("keydown", handleKeyDown);

    // Handle fullscreenchange events on safari webkit
    if ("webkitFullscreenElement" in document) {
      container.addEventListener("webkitfullscreenchange", () => {
        if ("webkitFullscreenElement" in document) {
          $isFullscreen = Boolean(document.webkitFullscreenElement);
        }
      });
    }
  });

  $: if ($theme) $app?.requestRender();
  $: if ($isFullscreen) requestFullscreen(container);
</script>

<div
  bind:this={container}
  in:fade={{ duration: 5000 }}
  class="bg-bg h-screen w-screen"
  on:fullscreenchange={() => {
    $isFullscreen = Boolean(document.fullscreenElement);
  }}
/>
