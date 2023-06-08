<script lang="ts">
  import { onMount } from "svelte";
  import { trapImage, trapImageLoaded } from "../_stores/appState";

  export let assetsVersion: number;

  const defaultTrapName = "box";
  let trapName: string;

  onMount(() => {
    const params = new URLSearchParams(window.location.search);
    trapName = params.get("trap")?.toLowerCase() || defaultTrapName;
  });
</script>

{#if trapName}
  <img
    bind:this={$trapImage}
    src={`/img/possible-game/${trapName}.png?v=${assetsVersion}`}
    alt={trapName}
    class="hidden"
    on:load={() => ($trapImageLoaded = true)}
    on:error={() => (trapName = defaultTrapName)}
  />
{/if}
