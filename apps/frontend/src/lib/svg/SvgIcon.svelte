<script lang="ts">
  export let width: number | undefined = 25;
  export let height: number | undefined = 25;
  export let viewBoxWidth: number | undefined = 512;
  export let viewBoxHeight: number | undefined = 512;
</script>

<svg
  {width}
  {height}
  viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
  fill="currentColor"
>
  <slot />
</svg>
