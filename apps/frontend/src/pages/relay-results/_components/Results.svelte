<script lang="ts">
  import { onMount } from "svelte";

  import * as d3 from "d3";

  import { get_error_message } from "@tonydangblog/error-handling";

  import ResultsChart from "./ResultsChart.svelte";
  import type {
    Data,
    TeamResult,
    Series,
    SeriesPoint,
  } from "./ResultsChart.svelte";

  export let date: string;

  let mounted = false;
  let data: Data | undefined;
  let stacked_team_times: Series[];

  async function get_data(date: string): Promise<void> {
    try {
      data = await d3.json(`/relay-results/${date}-results.json`);
      if (data) {
        const stack = d3.stack<TeamResult, string>().keys(data.keys);
        stacked_team_times = stack(data.team_results).map(
          (series: Series): Series => {
            series.forEach((seriesPoint: SeriesPoint): void => {
              const point = seriesPoint;
              if (Number.isNaN(seriesPoint.slice(-1)[0])) {
                [point[1]] = seriesPoint;
              } else {
                Object.defineProperty(seriesPoint, "key", {
                  value: series.key,
                });
              }
            });
            return series;
          }
        );
      }
    } catch (error: unknown) {
      console.log(get_error_message(error));
    }
  }

  onMount(() => (mounted = true));
  $: if (mounted) get_data(date);
</script>

<h2>Team Results</h2>
{#if data}
  <ResultsChart {data} {stacked_team_times} />
{/if}
