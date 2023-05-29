<script lang="ts">
  import { onMount } from "svelte";

  import {
    gameState,
    isMuted,
    scoreAudioCanPlayThrough,
  } from "../_stores/appState";

  let audio: HTMLAudioElement;
  let mounted = false;

  onMount(() => {
    audio.load();
    mounted = true;
  });

  function play() {
    if (mounted && $scoreAudioCanPlayThrough && !$isMuted) {
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

  $: if ($gameState === "ended") play();
  $: if (!$isMuted) play();
  $: if ($isMuted) pause();
</script>

<audio
  bind:this={audio}
  src="/audio/possible-game/score.mp3"
  preload="auto"
  on:canplaythrough={() => ($scoreAudioCanPlayThrough = true)}
/>
