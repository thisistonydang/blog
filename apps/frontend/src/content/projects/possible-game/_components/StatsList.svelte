<script lang="ts">
  import {
    attempts,
    currentStreak,
    finishes,
    interfaceState,
    longestStreak,
  } from "../_stores/appState";

  import Stat from "./Stat.svelte";
</script>

<dl class="xxs:text-base mx-auto mb-4 max-w-[160px] text-sm">
  <Stat name="Attempts" count={$attempts} />
  <Stat name="Finishes" count={$finishes} />
  {#if $interfaceState === "stats" || $currentStreak}
    <Stat name="Current Streak" count={$currentStreak} />
  {/if}
  <Stat name="Longest Streak" count={$longestStreak} />
</dl>
