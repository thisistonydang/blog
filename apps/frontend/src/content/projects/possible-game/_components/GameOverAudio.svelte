<script lang="ts">
  import { onMount } from "svelte";

  import {
    gameOverAudioCanPlayThrough,
    gameState,
    isMuted,
  } from "../_stores/appState";

  let audio: HTMLAudioElement;
  let mounted = false;

  onMount(() => {
    audio.load();
    mounted = true;
  });

  function play() {
    if (mounted && $gameOverAudioCanPlayThrough && !$isMuted) {
      audio.pause();
      audio.currentTime = 0;
      audio.play();
    }
  }

  function pause() {
    if (mounted) {
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
