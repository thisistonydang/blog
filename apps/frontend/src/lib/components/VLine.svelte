<script lang="ts">
  import type { Dimensions } from "@lib/types/d3";

  export let dms: Dimensions;
  export let x_position: number;
  export let label: string | null = null;

  const LABEL_PADDING = 10;
</script>

<g role="presentation" aria-hidden="true">
  <line
    class="stroke-heading pointer-events-none"
    y1={1.5 * -LABEL_PADDING}
    y2={dms.bounded_height}
    transform={`translate(${x_position}, 0)`}
    stroke-dasharray="4"
  />

  {#if label}
    <text
      class="fill-heading text-xs"
      transform={`translate(${x_position + 5}, ${-LABEL_PADDING})`}
    >
      {label}
    </text>
  {/if}
</g>
