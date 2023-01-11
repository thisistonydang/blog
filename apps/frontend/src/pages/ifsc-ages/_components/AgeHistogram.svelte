<script lang="ts">
  import Histogram from "@lib/components/Histogram.svelte";
  import type { DataPoint } from "@lib/types/d3";

  // Data
  export let data: DataPoint[];

  // Accessors
  const name_accessor = (d: DataPoint) => d.full_name as string;
  const age_accessor = (d: DataPoint) => d.age as number;
  const gender_accessor = (d: DataPoint) => d.gender as string;
  const has_img_accessor = (d: DataPoint) => d.has_img as boolean;
</script>

<Histogram
  {data}
  label="Age"
  x_accessor={age_accessor}
  num_ticks="all_values"
  num_bins="all_values"
  color_accessor={gender_accessor}
  {name_accessor}
  {has_img_accessor}
  img_dir="ifsc-athletes"
  details_array={(d) => [{ name: "", value: `Age ${age_accessor(d)}` }]}
  v_lines={[{ label: "Avg: 22 years old", value: 22 }]}
/>
