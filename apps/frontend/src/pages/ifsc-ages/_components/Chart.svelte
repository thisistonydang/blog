<script lang="ts">
  import type { Dimensions } from "@lib/types/d3";

  export let dms: Dimensions;
</script>

<svg width={dms.width} height={dms.height}>
  <g transform={`translate(${dms.left}, ${dms.top})`}>
    <slot />
  </g>
</svg>
