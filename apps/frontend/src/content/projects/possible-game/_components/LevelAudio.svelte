<script lang="ts">
  import { onMount } from "svelte";

  import {
    gameState,
    isMuted,
    levelAudioCanPlayThrough,
  } from "../_stores/appState";

  let audio: HTMLAudioElement;
  let mounted = false;

  onMount(() => {
    audio.load();
    mounted = true;
  });

  function play() {
    if (mounted && $levelAudioCanPlayThrough && !$isMuted) {
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

  $: if ($gameState === "playing") play();
  $: if (["not_started", "stopped"].includes($gameState)) pause();
  $: if ($isMuted) pause();
</script>

<audio
  bind:this={audio}
  src="/audio/possible-game/level-2.mp3"
  preload="auto"
  on:canplaythrough={() => ($levelAudioCanPlayThrough = true)}
/>
