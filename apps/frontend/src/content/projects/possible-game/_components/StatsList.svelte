<script lang="ts">
  import {
    attempts,
    currentStreak,
    finishes,
    longestStreak,
  } from "../_stores/appState";

  import Stat from "./Stat.svelte";
</script>

<dl class="mx-auto mb-8 max-w-[160px]">
  <Stat name="Attempts" count={$attempts} />
  <Stat name="Finishes" count={$finishes} />
  <Stat name="Current Streak" count={$currentStreak} />
  <Stat name="Longest Streak" count={$longestStreak} />
</dl>
