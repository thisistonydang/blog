<script lang="ts">
  import type { ScaleLinear } from "d3";
  import type { Dimensions } from "@lib/types/d3";

  export let dms: Dimensions;
  export let ticks: number[];
  export let x_scale: ScaleLinear<number, number>;
  export let bar_width: number;
  export let bar_width_padding: number;
  export let label: string | null = null;
</script>

<g transform={`translate(0, ${dms.bounded_height})`}>
  <line class="stroke-surface" x2={dms.bounded_width} />

  {#each ticks as tick}
    <text
      class="xs:text-sm xxs:text-xs fill-heading text-[10px]"
      text-anchor="middle"
      transform={`translate(${
        x_scale(tick) + (bar_width + bar_width_padding) / 2
      }, 20)`}
    >
      {tick}
    </text>
  {/each}

  {#if label}
    <text
      class="fill-heading text-sm"
      style:text-anchor="middle"
      transform={`translate(${dms.bounded_width / 2}, ${
        (dms.height - dms.bounded_height) / 2.5
      })`}
    >
      {label}
    </text>
  {/if}
</g>
