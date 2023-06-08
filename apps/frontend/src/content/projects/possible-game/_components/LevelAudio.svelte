<script lang="ts">
  import { onMount } from "svelte";

  import {
    gameState,
    isMuted,
    levelAudioCanPlayThrough,
  } from "../_stores/appState";

  export let assetsVersion: number;
  let audio: HTMLAudioElement;

  onMount(() => {
    audio.load();
  });

  function play() {
    if (audio && !$isMuted) {
      audio.pause();
      audio.currentTime = 0;
      audio.play();
    }
  }

  function pause() {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  }

  $: if ($gameState === "playing") play();
  $: if (["not_started", "stopped"].includes($gameState)) pause();
  $: if ($isMuted) pause();
</script>

<audio
  bind:this={audio}
  src={`/audio/possible-game/level-2.mp3?v=${assetsVersion}`}
  preload="auto"
  on:canplaythrough={() => ($levelAudioCanPlayThrough = true)}
/>
