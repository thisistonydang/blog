<script lang="ts">
  import { onMount } from "svelte";
  import { playerImage, playerImageLoaded } from "../_stores/appState";

  const defaultPlayerName = "default";
  let playerName: string | undefined;

  onMount(() => {
    const params = new URLSearchParams(window.location.search);
    playerName = params.get("player")?.toLowerCase() || defaultPlayerName;
  });
</script>

<img
  bind:this={$playerImage}
  src={`/img/possible-game/${playerName}.png`}
  alt={playerName}
  class="hidden"
  on:load={() => ($playerImageLoaded = true)}
  on:error={() => (playerName = defaultPlayerName)}
/>
