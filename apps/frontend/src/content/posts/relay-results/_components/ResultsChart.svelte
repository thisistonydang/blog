<script context="module" lang="ts">
  interface Runners {
    [key: string]: string;
  }

  export interface TeamResult {
    [key: string]: Runners | string | number;
    runners: Runners;
    team: string;
    total_time: number;
  }

  export interface Data {
    keys: string[];
    members_per_team: number;
    team_names: string[];
    team_results: TeamResult[];
    x_max: number;
  }

  export type Series = d3.Series<TeamResult, string>;

  export type SeriesPoint = d3.SeriesPoint<TeamResult>;

  // Type for keyed SeriesPoint, but not usable in svelte templates.
  interface KeyedSeriesPoint extends d3.SeriesPoint<TeamResult> {
    key: string;
  }
</script>

<script lang="ts">
  import { fade } from "svelte/transition";

  import * as d3 from "d3";

  import { seconds_to_string } from "../_lib/time/seconds-to-string";
  import { horizontal_slide } from "../_lib/actions/horizontal-slide";

  export let data: Data;
  export let stacked_team_times: Series[];

  const margin = { top: 15, right: 75, bottom: 30, left: 85 };
  const bar_height = 50;
  const width = 640;
  let y_axis: SVGGElement;

  $: height =
    data.team_results.length * bar_height + margin.top + margin.bottom;

  $: x_scale = d3
    .scaleLinear()
    .domain([0, data.x_max])
    .rangeRound([margin.left, width - margin.right]);
  $: y_scale = d3
    .scaleBand()
    .domain(data.team_names.map((name: string): string => `Team ${name}`))
    .rangeRound([margin.top, height - margin.bottom])
    .padding(0.08);

  $: num_ticks = Math.floor(data.x_max / (60 * 15)) + 1;
  $: tick_values = Array.from({ length: num_ticks }, (_, i) => i * 60 * 15);

  $: d3.select(y_axis).call(d3.axisLeft(y_scale).tickSizeOuter(0));
</script>

<svg viewBox="0 0 {width} {height}">
  {#key data}
    {#each stacked_team_times as runnerGroup}
      {#each runnerGroup as runner, index}
        {@const y = y_scale(`Team ${runner.data.team}`)}
        {#if y}
          <!-- bars -->
          <rect
            class={parseInt(runner.key) % 2 === 0
              ? "fill-cyan-400 transition-[width] duration-1000 ease-in-out dark:fill-cyan-800"
              : "fill-cyan-500 transition-[width] duration-1000 ease-in-out dark:fill-cyan-900"}
            x={x_scale(runner[0])}
            {y}
            width={0}
            height={y_scale.bandwidth()}
            use:horizontal_slide={{
              width: x_scale(runner[1]) - x_scale(runner[0]),
              delay: index * 100,
            }}
          />

          <!-- bar text -->
          <text
            in:fade={{ duration: 500, delay: 500 }}
            class="fill-black text-sm dark:fill-white"
          >
            <tspan
              x={x_scale(runner[0])}
              y={y + y_scale.bandwidth() / 2}
              dy="-0.2em"
              dx="10"
            >
              {runner.data.runners[runner.key]
                ? runner.data.runners[runner.key]
                : ""}
            </tspan>
            <tspan
              x={x_scale(runner[0])}
              y={y + y_scale.bandwidth() / 2}
              dy="1em"
              dx="10"
            >
              {runner.data.runners[runner.key]
                ? seconds_to_string(runner.data[runner.key])
                : ""}
            </tspan>
          </text>

          <!-- total time text -->
          <text
            in:fade={{ duration: 500, delay: 500 }}
            class="fill-text text-sm"
            x={x_scale(runner[1])}
            y={y + y_scale.bandwidth() / 2}
            dy="0.35em"
            dx="10"
          >
            {parseInt(runner.key, 10) === data.members_per_team
              ? seconds_to_string(runner.data.total_time)
              : ""}
          </text>
        {/if}
      {/each}
    {/each}
  {/key}

  <!-- x-axis -->
  <g class="text-sm" transform="translate(0, {height - margin.bottom})">
    {#each tick_values as tick}
      <g transform="translate({x_scale(tick) + 0.5}, 0)">
        <line y2="6" class="stroke-text" />
        <text class="fill-text text-sm" y="9" dy="0.75em" dx="-1em">
          {seconds_to_string(tick)}
        </text>
      </g>
    {/each}
  </g>

  <!-- y-axis -->
  <g
    bind:this={y_axis}
    class="text-sm"
    transform="translate({margin.left}, 0)"
  />
</svg>
