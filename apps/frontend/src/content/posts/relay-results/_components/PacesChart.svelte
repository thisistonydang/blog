<script context="module" lang="ts">
  export interface Run {
    name: string;
    pace: number;
  }
</script>

<script lang="ts">
  import { cubicInOut } from "svelte/easing";
  import { fly } from "svelte/transition";

  import * as d3 from "d3";

  import { seconds_to_string } from "../_lib/time/seconds-to-string";
  import { horizontal_slide } from "../_lib/actions/horizontal-slide";

  export let data: Run[];

  const margin = { top: 15, right: 50, bottom: 30, left: 85 };
  const bar_height = 30;
  const width = 640;

  $: x_scale = d3
    .scaleLinear()
    .domain([0, x_max])
    .rangeRound([margin.left, width - margin.right]);

  $: y_scale = d3
    .scaleBand<number>()
    .domain(d3.range(data.length))
    .rangeRound([margin.top, height - margin.bottom])
    .padding(0.1);

  $: height = data.length * bar_height + margin.top + margin.bottom;
  $: x_max = d3.max(data, (d: Run): number => d.pace) as number;
  $: num_ticks = Math.floor(x_max / 60) + 1;
  $: tick_values = Array.from({ length: num_ticks }, (_, i) => i * 60);
</script>

<svg viewBox="0 0 {width} {height}">
  <!-- bars -->
  {#key data}
    <g>
      {#each data as run, index}
        <rect
          class="fill-cyan-500 transition-[width] duration-1000 ease-in-out dark:fill-cyan-900"
          x={x_scale(0)}
          y={y_scale(index)}
          width={0}
          height={y_scale.bandwidth()}
          use:horizontal_slide={{
            width: x_scale(run.pace) - x_scale(0),
            delay: index * 100,
          }}
        />
        <text
          class="fill-black text-sm dark:fill-white"
          x={x_scale(run.pace)}
          y={(y_scale(index) || 0) + y_scale.bandwidth() / 2}
          dx="-4"
          dy="0.35em"
          text-anchor="end"
          in:fly={{
            x: -x_scale(x_max),
            duration: 1000,
            delay: 200 + index * 100,
            easing: cubicInOut,
          }}
        >
          {seconds_to_string(run.pace)}
        </text>
      {/each}
    </g>
  {/key}

  <!-- x-axis -->
  <g class="text-sm" transform="translate(0, {height - margin.bottom})">
    {#each tick_values as tick}
      <g transform="translate({x_scale(tick)}, 0)">
        <line y2="6" stroke="currentColor" />
        <text class="fill-text text-sm" y="9" dy="0.75em" dx="-1em">
          {seconds_to_string(tick)}
        </text>
      </g>
    {/each}
  </g>

  <!-- y-axis -->
  <g class="text-sm" transform="translate({margin.left}, 0)">
    <line x1="0" y1="15" x2="0" y2={height - 30} stroke="currentColor" />
    {#each data as run, index}
      <g
        transform="translate(0, {(y_scale(index) || 0) +
          y_scale.bandwidth() / 2})"
      >
        <line x2="-6" stroke="currentColor" />
        <text class="fill-text text-sm" x="-9" dy="0.35em" text-anchor="end">
          {run.name}
        </text>
      </g>
    {/each}
  </g>
</svg>
