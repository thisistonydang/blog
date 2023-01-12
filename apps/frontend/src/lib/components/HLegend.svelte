<script lang="ts">
  import type { ScaleOrdinal } from "d3";
  import type { Dimensions } from "@lib/types/d3";

  export let dms: Dimensions;
  export let color_scale: ScaleOrdinal<string, string>;
  export let spacing = 75;

  const SQUARE_LENGTH = 10;
</script>

<g
  role="presentation"
  aria-hidden="true"
  transform={`translate(5, ${
    dms.height - (dms.height - dms.bounded_height) / 2.5
  })`}
>
  {#each color_scale.domain() as label, i}
    <rect
      class={`fill-[${color_scale(label)}]`}
      width={SQUARE_LENGTH}
      height={SQUARE_LENGTH}
      transform={`translate(${0 + spacing * i}, 0)`}
    />

    <text
      class="fill-heading text-xs"
      transform={`translate(${20 + spacing * i}, ${SQUARE_LENGTH})`}
    >
      {label}
    </text>
  {/each}
</g>
