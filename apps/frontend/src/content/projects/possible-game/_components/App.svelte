<script lang="ts">
  import {
    gameOverAudioCanPlayThrough,
    gameState,
    levelAudioCanPlayThrough,
    scoreAudioCanPlayThrough,
  } from "../_stores/appState";

  import Audio from "./Audio.svelte";
  import Canvas from "./Canvas.svelte";
  import Interface from "./Interface.svelte";
  import LocalStorage from "./LocalStorage.svelte";
  import RestartDialog from "./RestartDialog.svelte";

  $: isReady =
    $scoreAudioCanPlayThrough &&
    $gameOverAudioCanPlayThrough &&
    $levelAudioCanPlayThrough;
</script>

<Audio />
<LocalStorage />

{#if isReady}
  <Canvas />
{/if}

{#if $gameState === "not_started"}
  <Interface />
{:else if $gameState === "stopped"}
  <RestartDialog title="You died :(" />
{:else if $gameState === "ended"}
  <RestartDialog title="You won!" />
{/if}
