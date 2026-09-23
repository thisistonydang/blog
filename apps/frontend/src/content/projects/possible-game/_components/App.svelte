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
  import { authStatus } from "../_stores/competitiveState";

  import Assets from "./Assets.svelte";
  import AuthGate from "./AuthGate.svelte";
  import Canvas from "./Canvas.svelte";
  import CompetitiveController from "./CompetitiveController.svelte";
  import GameToasts from "./GameToasts.svelte";
  import Interface from "./Interface.svelte";
  import LocalStorage from "./LocalStorage.svelte";
  import OnlineStatus from "./OnlineStatus.svelte";
  import RestartDialog from "./RestartDialog.svelte";

  export let assetsVersion: number;

  $: assetsReady =
    $scoreAudioCanPlayThrough &&
    $gameOverAudioCanPlayThrough &&
    $levelAudioCanPlayThrough &&
    $playerImageLoaded &&
    $trapImageLoaded;
  $: gameUnlocked = $authStatus === "signed_in";
</script>

<Assets {assetsVersion} />

<LocalStorage />
<CompetitiveController />

<main>
  {#if gameUnlocked && assetsReady}
    <Canvas />
  {:else}
    <div class="bg-bg flex h-screen w-screen items-center justify-center">
      <Loading />
    </div>
  {/if}

  {#if gameUnlocked}
    {#if $gameState === "not_started"}
      <Interface />
    {:else if $gameState === "stopped"}
      <RestartDialog title="You died :(" />
    {:else if $gameState === "ended"}
      <RestartDialog title="You won!" />
    {/if}
  {/if}
</main>

{#if $authStatus === "signed_out" || $authStatus === "error"}
  <AuthGate />
{/if}

{#if $authStatus === "signed_in"}
  <OnlineStatus />
  <GameToasts />
{/if}
