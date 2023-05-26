<script lang="ts">
  import { onMount } from "svelte";

  import { gameState, isFullscreen } from "../_stores/appState";
  import { App } from "../_world/App";

  import Interface from "./Interface.svelte";
  import RestartModal from "./RestartModal.svelte";

  let container: HTMLDivElement;
  let app: App;

  onMount(() => {
    app = new App(container);
    app.requestRender();
  });

  $: if ($isFullscreen) container.requestFullscreen();
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
  <RestartModal title="You died :(" {app} />
{:else if $gameState === "ended"}
  <RestartModal title="You won!" {app} />
{/if}
