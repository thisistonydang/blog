<script lang="ts">
  export let width = 25;
  export let height = 25;
  export let viewBoxWidth = 512;
  export let viewBoxHeight = 512;
</script>

<svg
  {width}
  {height}
  viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
  fill="currentColor"
>
  <slot />
</svg>
