<script>
  import { onMount } from "svelte";
  import { format, interpolateRound } from "d3";

  export let color;
  export let title;
  export let tickFormat;
  export let tickSize = 6;
  export let width = 320;
  export let height = 44 + tickSize;
  export let marginTop = 18;
  export let marginRight = 0;
  export let marginBottom = 16 + tickSize;
  export let marginLeft = 0;

  // Define xScale
  const xScale = Object.assign(
    color
      .copy()
      .interpolator(interpolateRound(marginLeft, width - marginRight)),
    {
      range() {
        return [marginLeft, width - marginRight];
      },
    },
  );

  const n = 256;
  let canvas;
  let href;

  // Create color gradient png client side
  onMount(() => {
    const context = canvas.getContext("2d");
    for (let i = 0; i < n; ++i) {
      context.fillStyle = color.interpolator()(i / (n - 1));
      context.fillRect(i, 0, 1, 1);
    }
    href = canvas.toDataURL();
  });
</script>

<!-- Hidden canvas for color gradient png generation -->
<canvas bind:this={canvas} width={n} height="1" hidden />

<!-- Legend -->
<svg {width} {height} viewBox="0 0 {width} {height}" style:overflow="visible">
  <!-- Add color gradient image -->
  <image
    x={marginLeft}
    y={marginTop}
    width={width - marginLeft - marginRight}
    height={height - marginTop - marginBottom}
    preserveAspectRatio="none"
    {href}
  />

  <g transform="translate(0,{height - marginBottom})" font-size="10">
    <!-- Add ticks -->
    {#each xScale.ticks() as tick}
      <!-- Display only even ticks -->
      {#if (tick * 100) % 2 === 0}
        <g transform="translate({xScale(tick)},0)" text-anchor="middle">
          <line stroke="#000" y2="6" y1="-10" />
          <text y="9" dy="0.71em">{format(tickFormat)(tick)}</text>
        </g>
      {/if}
    {/each}

    <!-- Add legend title -->
    <text
      x={marginLeft}
      y={marginTop + marginBottom - height - 6}
      font-weight="bold"
    >
      {title}
    </text>
  </g>
</svg>
