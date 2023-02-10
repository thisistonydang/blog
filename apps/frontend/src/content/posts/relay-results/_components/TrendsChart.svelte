<script context="module" lang="ts">
  export interface DataPoint {
    date: Date;
    name: string;
    pace: number;
  }
</script>

<script lang="ts">
  import { sineIn } from "svelte/easing";
  import { draw, fade } from "svelte/transition";

  import * as d3 from "d3";

  import { category_12 } from "../_lib/color/category-12";
  import { add_days_to_date } from "../_lib/time/add-days-to-date";
  import { seconds_to_string } from "../_lib/time/seconds-to-string";

  export let date: string;
  export let data: DataPoint[][];
  export let all_paces: number[];

  const legend_margin = 80;
  const width = 640;
  const line = d3
    .line<DataPoint>()
    .x((d: DataPoint): number => x_scale(d.date))
    .y((d: DataPoint): number => y_scale(d.pace));
  let x_axis: SVGGElement;
  let y_axis: SVGGElement;

  $: runner_names = data.map((d: DataPoint[]) => d[0]?.name) as string[];
  $: colors = d3.scaleOrdinal(category_12).domain(runner_names);

  $: margin = {
    top: 15,
    right: 75,
    bottom: runner_names.length * 16 + legend_margin,
    left: 85,
  };
  $: height = 320 + margin.top + margin.bottom;

  $: x_scale = d3
    .scaleTime()
    .domain([
      new Date("2019-01-01T00:00:00-08:00"),
      add_days_to_date(`${date}T00:00:00-08:00`, 8 * 30),
    ])
    .rangeRound([margin.left, width - margin.right]);
  $: y_scale = d3
    .scaleLinear()
    .domain([Math.min(...all_paces) - 30, Math.max(...all_paces) + 30])
    .rangeRound([height - margin.bottom, margin.top]);

  $: d3.select(x_axis)
    .call(d3.axisBottom(x_scale).tickSizeOuter(0))
    .selectAll("text")
    .attr("transform", "rotate(-45)")
    .attr("text-anchor", "end")
    .attr("x", -8)
    .attr("y", 8);

  $: d3.select(y_axis).call(
    d3
      .axisLeft(y_scale)
      .tickSizeOuter(0)
      .tickFormat((d: d3.NumberValue): string => seconds_to_string(d as number))
  );
</script>

<svg viewBox="0 0 {width} {height}">
  <!-- trend lines -->
  {#each data as d}
    {@const firstRun = d[0]}
    {#if firstRun}
      {#key data}
        <path
          in:draw={{ duration: 1000, easing: sineIn }}
          d={line(d)}
          stroke={colors(firstRun.name)}
          stroke-width="4"
          fill="none"
        />
      {/key}
    {/if}
  {/each}

  <!-- data points -->
  {#each data as d}
    {@const firstRun = d[0]}
    {#if firstRun}
      {#each d as p}
        {@const x = x_scale(p.date)}
        {@const y = y_scale(p.pace)}
        <g in:fade class="group">
          <circle
            cx={x}
            cy={y}
            r="5"
            class="stroke-bg transition-[cx,cy] duration-1000"
            fill={colors(firstRun.name)}
          />
          <g class="hidden group-hover:block">
            <rect
              x={x + 10}
              y={y - 15}
              class="fill-surface"
              height="40"
              width={p.name.length * 10 +
                15 +
                seconds_to_string(p.pace).length * 10}
            />
            <text class="fill-text text-sm">
              <tspan x={x + 15} {y}>
                {new Intl.DateTimeFormat([], {
                  dateStyle: "short",
                }).format(p.date)}
              </tspan>
              <tspan x={x + 15} y={y + 18}>
                {p.name} - {seconds_to_string(p.pace)}
              </tspan>
            </text>
          </g>
        </g>
      {/each}
    {/if}
  {/each}

  <!-- legend -->
  {#each data as d, i}
    {@const firstRun = d[0]}
    {#if firstRun}
      <circle
        cx={margin.left}
        cy={height - margin.bottom + legend_margin + i * 16}
        r="5"
        fill={colors(firstRun.name)}
      />
      <text
        x="100"
        y={height - margin.bottom + legend_margin + 4 + i * 16}
        class="fill-text"
      >
        {firstRun.name}
      </text>
    {/if}
  {/each}

  <!-- x-axis -->
  <g
    bind:this={x_axis}
    class="text-sm"
    transform="translate(0, {height - margin.bottom})"
  />

  <!-- y-axis -->
  <g
    bind:this={y_axis}
    class="text-sm"
    transform="translate({margin.left}, 0)"
  />
</svg>
