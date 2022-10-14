<script lang="ts">
  import { onMount } from "svelte";

  import * as d3 from "d3";

  import { get_error_message } from "@tonydangblog/error-handling";

  import TrendsChart from "./TrendsChart.svelte";
  import type { DataPoint } from "./TrendsChart.svelte";

  export let date: string;

  let mounted = false;
  let data: DataPoint[][] | undefined;
  let all_paces: number[] = [];

  async function get_trends(date: string): Promise<void> {
    try {
      data = await d3.json(`/relay-results/${date}-trends.json`);
      if (data?.length) {
        data = data.map((runner: DataPoint[]): DataPoint[] =>
          runner.map(
            (d: DataPoint): DataPoint => ({
              date: new Date(d.date),
              name: d.name,
              pace: d.pace,
            })
          )
        );
        data.forEach((runner: DataPoint[]): void => {
          runner.forEach((d: DataPoint): void => {
            all_paces.push(d.pace);
          });
        });
      }
    } catch (error: unknown) {
      console.log(get_error_message(error));
    }
  }

  onMount(() => (mounted = true));
  $: if (mounted) get_trends(date);
</script>

<h2>Trends</h2>
{#if data?.length}
  <TrendsChart {date} {data} {all_paces} />
{:else}
  <p>No trends data for this run.</p>
{/if}
