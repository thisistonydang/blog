<script lang="ts">
  import {
    attempts,
    currentStreak,
    finishes,
    longestStreak,
  } from "../_stores/appState";

  import Stat from "./Stat.svelte";

  export let showCurrentStreak = false;
</script>

<dl class="xxs:text-base not-prose mx-auto mb-4 max-w-[160px] text-sm">
  <Stat name="Attempts" count={$attempts} />
  <Stat name="Finishes" count={$finishes} />
  {#if showCurrentStreak || $currentStreak}
    <Stat name="Current Streak" count={$currentStreak} />
  {/if}
  <Stat name="Longest Streak" count={$longestStreak} />
</dl>
