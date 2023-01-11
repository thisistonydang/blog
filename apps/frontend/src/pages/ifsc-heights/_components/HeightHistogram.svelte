<script lang="ts">
  import Histogram from "@lib/components/Histogram.svelte";
  import type { DataPoint } from "@lib/types/d3";

  import { cm_to_imperial } from "../_lib/cm_to_imperial";

  // Data
  export let data: DataPoint[];
  export let mean_height_women: number;
  export let mean_height_men: number;

  // Accessors
  const name_accessor = (d: DataPoint) => d.full_name as string;
  const height_accessor = (d: DataPoint) => d.height as number;
  const gender_accessor = (d: DataPoint) => d.gender as string;
  const has_img_accessor = (d: DataPoint) => d.has_img as boolean;
</script>

<Histogram
  {data}
  label="Height (cm)"
  x_accessor={height_accessor}
  num_bins="all_values"
  color_accessor={gender_accessor}
  {name_accessor}
  {has_img_accessor}
  img_dir="ifsc-athletes"
  details_array={(d) => [
    { name: "Height (cm)", value: `${height_accessor(d)}` },
    {
      name: "Height (imperial)",
      value: `${cm_to_imperial(height_accessor(d))}`,
    },
  ]}
  v_lines={[
    { label: `Avg: ${mean_height_women} cm (Women)`, value: mean_height_women },
    { label: `Avg: ${mean_height_men} cm (Men)`, value: mean_height_men },
  ]}
/>
