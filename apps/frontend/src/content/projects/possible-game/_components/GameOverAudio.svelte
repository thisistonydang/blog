<script lang="ts">
  import { onMount } from "svelte";

  import {
    gameOverAudioCanPlayThrough,
    gameState,
    isMuted,
  } from "../_stores/appState";

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

  $: if ($gameState === "stopped") play();
  $: if ($isMuted) pause();
</script>

<audio
  bind:this={audio}
  src="/audio/possible-game/game-over.mp3"
  preload="auto"
  on:canplaythrough={() => ($gameOverAudioCanPlayThrough = true)}
/>
