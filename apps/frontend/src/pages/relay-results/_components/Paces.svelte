<script lang="ts">
  import { onMount } from "svelte";

  import { get_error_message } from "@tonydangblog/error-handling";

  import PacesChart from "./PacesChart.svelte";
  import type { Run } from "./PacesChart.svelte";

  export let date: string;

  let mounted = false;
  let data: Run[] | undefined;

  async function get_paces(date: string): Promise<void> {
    try {
      const res = await fetch(`/relay-results/${date}-paces.json`);
      data = await res.json();
    } catch (error: unknown) {
      console.log(get_error_message(error));
    }
  }

  onMount(() => (mounted = true));
  $: if (mounted) get_paces(date);
</script>

<h2>Average Mile Paces</h2>
{#if data}
  <PacesChart {data} />
{/if}
