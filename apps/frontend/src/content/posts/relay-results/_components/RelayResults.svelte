<script lang="ts">
  import Results from "./Results.svelte";
  import Paces from "./Paces.svelte";
  import Trends from "./Trends.svelte";
  import Notes from "./Notes.svelte";

  export let runs: { date: string; location: string }[];

  let selected = runs[0] as { date: string; location: string };
</script>

<label>
  <p class="m-0 px-1 text-sm">Select a date:</p>
  <select
    bind:value={selected}
    class="
      border-text
      hover:border-accent hover:bg-surface focus:border-accent
      focus:bg-surface w-full
      border-0 border-b bg-transparent
      focus:ring-0
    "
  >
    {#each runs as run}
      <option value={run}>{run.date} - {run.location}</option>
    {/each}
  </select>
</label>

<Results date={selected.date} />
<Paces date={selected.date} />
<Trends date={selected.date} />
<Notes date={selected.date} />
