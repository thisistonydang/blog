<script lang="ts">
  import type { Dimensions } from "@lib/types/d3";

  export let dms: Dimensions;
  export let x_position: number;
  export let label: string | null = null;
</script>

<g>
  <line
    class="stroke-heading"
    y1="0"
    y2={dms.bounded_height}
    transform={`translate(${x_position}, 0)`}
    stroke-dasharray="4"
  />

  {#if label}
    <text
      class="fill-heading text-xs"
      transform={`translate(${x_position + 5}, 5)`}
    >
      {label}
    </text>
  {/if}
</g>
