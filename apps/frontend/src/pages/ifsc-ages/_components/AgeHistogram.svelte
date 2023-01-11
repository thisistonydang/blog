<script lang="ts">
  import { bin, mean } from "d3-array";
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

  // Data
  export let data: DataPoint[];

  // Accessors
  const name_accessor = (d: DataPoint) => d.full_name as string;
  const age_accessor = (d: DataPoint) => d.age as number;
  const gender_accessor = (d: DataPoint) => d.gender as string;
  const has_img_accessor = (d: DataPoint) => d.has_img as boolean;

  const bar_width_padding = 4;
  const bar_height_padding = 1;
  $: min_age = Math.min(...data.map(age_accessor));
  $: max_age = Math.max(...data.map(age_accessor));
  $: mean_age = Math.round(mean(data, age_accessor) as number);

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
    new Set(data.map(gender_accessor))
  );

  $: x_scale = scaleLinear()
    .domain([min_age, max_age + 1])
    .range([0, dms.bounded_width]);

  // Bins
  $: bins = bin()
    .value(age_accessor as () => number)
    .thresholds(max_age - min_age)(data as []) as unknown as Bin<
    DataPoint,
    number
  >[];

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
  $: ticks = x_scale.ticks(max_age - min_age).slice(0, -1);

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
  <Chart {dms}>
    <Bins
      {dms}
      {bins}
      {x_scale}
      {color_scale}
      color_accessor={gender_accessor}
      {bar_width}
      {bar_width_padding}
      {bar_height}
      {bar_height_padding}
      {name_accessor}
      {has_img_accessor}
      img_dir="ifsc-athletes"
      details_array={(d) => [
        { name: "", value: `${age_accessor(d)} years old` },
      ]}
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
      label="Age"
    />
    <VLine
      {dms}
      x_position={x_scale(mean_age) + (bar_width + bar_width_padding) / 2}
      label={`Avg: ${mean_age} years old`}
    />
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
