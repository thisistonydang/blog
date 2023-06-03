<script lang="ts">
  import { onMount } from "svelte";
  import { playerImage, playerImageLoaded } from "../_stores/appState";

  let tryLoadingImage = false;
  let playerName: string | undefined;

  onMount(() => {
    const params = new URLSearchParams(window.location.search);
    playerName = params.get("player")?.toLowerCase();

    if (playerName) {
      tryLoadingImage = true;
      return;
    }

    $playerImageLoaded = true;
  });
</script>

{#if tryLoadingImage}
  <img
    bind:this={$playerImage}
    src={`/img/possible-game/${playerName}.png`}
    alt=""
    class="hidden"
    on:load={() => ($playerImageLoaded = true)}
    on:error={() => {
      $playerImage = undefined;
      $playerImageLoaded = true;
    }}
  />
{/if}
