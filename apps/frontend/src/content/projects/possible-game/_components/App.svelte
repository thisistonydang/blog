<script lang="ts">
  import { onMount } from "svelte";

  import { gameState, interfaceState, isFullscreen } from "../_stores/appState";
  import { App } from "../_world/App";

  import Interface from "./Interface.svelte";
  import RestartDialog from "./RestartDialog.svelte";

  let container: HTMLDivElement;
  let app: App;

  onMount(() => {
    app = new App(container);
    app.requestRender();
  });

  $: if ($isFullscreen) container.requestFullscreen();

  function closeInterfaceDialog() {
    if (["credits", "how_to_play"].includes($interfaceState)) {
      $interfaceState = "opened";
    }
  }
</script>

<div
  bind:this={container}
  class="h-screen w-screen animate-[fade-in_10s]"
  on:fullscreenchange={() => {
    $isFullscreen = Boolean(document.fullscreenElement);
  }}
  on:click={closeInterfaceDialog}
  on:keypress={closeInterfaceDialog}
/>

{#if $gameState === "not_started"}
  <Interface />
{:else if $gameState === "stopped"}
  <RestartDialog title="You died :(" {app} />
{:else if $gameState === "ended"}
  <RestartDialog title="You won!" {app} />
{/if}
