<script lang="ts">
  import { competitiveUser, leaderboard } from "../_stores/competitiveState";
  import StatsList from "./StatsList.svelte";

  function percent(value: number): string {
    return `${Math.round(value * 100)}%`;
  }
</script>

<h2 class="mb-1 mt-5 text-center">Your stats</h2>
<StatsList showCurrentStreak />

<hr class="border-text/30 my-4" />

{#if $leaderboard.leaders.length}
  <div class="not-prose max-h-[50vh] overflow-auto">
    <table class="w-full min-w-[320px] text-left text-sm">
      <thead>
        <tr class="border-text border-b">
          <th class="p-2">Rank</th>
          <th class="p-2">Player</th>
          <th class="p-2 text-right">Streak</th>
          <th class="p-2 text-right">Finish rate</th>
        </tr>
      </thead>
      <tbody>
        {#each $leaderboard.leaders as player}
          <tr
            class="border-text/30 border-b"
            class:font-bold={player.userId === $competitiveUser?.id}
          >
            <td class="p-2">{player.rank}</td>
            <td class="max-w-[160px] truncate p-2">{player.displayName}</td>
            <td class="p-2 text-right">{player.longestStreak}</td>
            <td class="p-2 text-right">{percent(player.finishRate)}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  {#if $leaderboard.current &&
  !$leaderboard.leaders.some((player) => player.userId === $competitiveUser?.id)}
    <p class="text-center text-sm">
      Your rank: {$leaderboard.current.rank}, longest streak:
      {$leaderboard.current.longestStreak}, finish rate:
      {percent($leaderboard.current.finishRate)}
    </p>
  {/if}
{:else}
  <p class="text-center">Finish your first attempt to join the leaderboard.</p>
{/if}
