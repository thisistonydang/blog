<script lang="ts">
  import type { Dimensions } from "@lib/types/d3";

  export let dms: Dimensions;
  export let title: string;
</script>

<svg role="figure" width={dms.width} height={dms.height} on:focus={() => null}>
  <title>{title}</title>
  <g transform={`translate(${dms.left}, ${dms.top})`}>
    <slot />
  </g>
</svg>
