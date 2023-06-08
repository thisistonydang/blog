<script lang="ts">
  import Loading from "@lib/components/Loading.svelte";

  import {
    gameOverAudioCanPlayThrough,
    gameState,
    levelAudioCanPlayThrough,
    playerImageLoaded,
    scoreAudioCanPlayThrough,
    trapImageLoaded,
  } from "../_stores/appState";

  import Assets from "./Assets.svelte";
  import Canvas from "./Canvas.svelte";
  import Interface from "./Interface.svelte";
  import LocalStorage from "./LocalStorage.svelte";
  import RestartDialog from "./RestartDialog.svelte";

  export let assetsVersion: number;

  $: assetsReady =
    $scoreAudioCanPlayThrough &&
    $gameOverAudioCanPlayThrough &&
    $levelAudioCanPlayThrough &&
    $playerImageLoaded &&
    $trapImageLoaded;
</script>

<Assets {assetsVersion} />
<LocalStorage />

<main>
  {#if assetsReady}
    <Canvas />
  {:else}
    <Loading />
  {/if}

  {#if $gameState === "not_started"}
    <Interface />
  {:else if $gameState === "stopped"}
    <RestartDialog title="You died :(" />
  {:else if $gameState === "ended"}
    <RestartDialog title="You won!" />
  {/if}
</main>
