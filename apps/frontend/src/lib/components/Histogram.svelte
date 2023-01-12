<script lang="ts">
  import { bin } from "d3-array";
  import { scaleLinear, scaleOrdinal } from "d3-scale";
  import type { Bin } from "d3";

  import { Pastel } from "@lib/colors/Pastel";
  import Chart from "@lib/components/Chart.svelte";
  import Bins from "@lib/components/Bins.svelte";
  import HLegend from "@lib/components/HLegend.svelte";
  import Tooltip from "@lib/components/Tooltip.svelte";
  import VBarXAxis from "@lib/components/VBarXAxis.svelte";
  import VLine from "@lib/components/VLine.svelte";

  import type { Detail } from "@lib/components/Tooltip.svelte";
  import type { DataPoint } from "@lib/types/d3";

  export let data: DataPoint[];
  export let title: string;
  export let label: string;
  export let x_accessor: (d: DataPoint) => number;
  export let num_ticks: "default" | "all_values" = "default";
  export let num_bins: "default" | "all_values" = "default";
  export let color_accessor: (d: DataPoint) => string;
  export let name_accessor: (d: DataPoint) => string;
  export let has_img_accessor: (d: DataPoint) => boolean;
  export let img_dir: string;
  export let details_array: (d: DataPoint) => Detail[];
  export let v_lines: { label: string; value: number }[];

  const bar_width_padding = 4;
  const bar_height_padding = 1;
  $: x_min = Math.min(...data.map(x_accessor));
  $: x_max = Math.max(...data.map(x_accessor));

  // Chart dimensions
  let width = 700;
  let height = 450;

  const margin = { top: 20, right: 0, bottom: 100, left: 0 };
  $: dms = {
    width,
    height,
    ...margin,
    bounded_width: Math.max(width - margin.left - margin.right, 0),
    bounded_height: Math.max(height - margin.top - margin.bottom, 0),
  };

  // Scales
  $: color_scale = scaleOrdinal(Pastel).domain(
    new Set(data.map(color_accessor))
  );

  $: x_scale = scaleLinear()
    .domain([x_min, x_max + 1])
    .range([0, dms.bounded_width]);

  // Bins
  $: bins_generator =
    num_bins === "all_values"
      ? bin()
          .value(x_accessor as () => number)
          .thresholds(x_max - x_min)
      : bin().value(x_accessor as () => number);
  $: bins = bins_generator(data as []) as unknown as Bin<DataPoint, number>[];

  // Bar width
  $: bar_width = Math.floor(
    dms.bounded_width / bins.length - bar_width_padding
  );

  // Bar height
  $: max_bin_count = Math.max(...bins.map((bin) => bin.length));
  $: bar_height = Math.floor(
    dms.bounded_height / max_bin_count - bar_height_padding
  );

  // XAxis ticks
  $: ticks =
    num_ticks === "all_values"
      ? x_scale.ticks(x_max - x_min).slice(0, -1)
      : x_scale.ticks();

  // Tooltip parent state binded to Bins
  let display = false;
  let x = 0;
  let y = 0;
  let img_src = "";
  let img_alt = "";
  let name = "";
  let details: Detail[] = [];

  // Hide tooltip on chart width resize
  $: if (width < 701) display = false;
</script>

<div class="relative" bind:clientWidth={width} bind:clientHeight={height}>
  <Chart {dms} {title}>
    <Bins
      {dms}
      {bins}
      {x_scale}
      {color_scale}
      {color_accessor}
      {bar_width}
      {bar_width_padding}
      {bar_height}
      {bar_height_padding}
      {name_accessor}
      {has_img_accessor}
      {img_dir}
      {details_array}
      bind:display
      bind:x
      bind:y
      bind:img_src
      bind:img_alt
      bind:name
      bind:details
    />
    <VBarXAxis
      {dms}
      {ticks}
      {x_scale}
      {bar_width}
      {bar_width_padding}
      {label}
    />
    {#each v_lines as line}
      <VLine
        {dms}
        x_position={x_scale(line.value) + (bar_width + bar_width_padding) / 2}
        label={line.label}
      />
    {/each}
    <HLegend {dms} {color_scale} />
  </Chart>
  <Tooltip
    {dms}
    {bar_width}
    {bar_width_padding}
    {display}
    {x}
    {y}
    {img_src}
    {img_alt}
    {name}
    {details}
  />
</div>
