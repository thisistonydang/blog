<script>
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

  const numGradientRects = 256;
  const gradientRectWidth =
    (width - marginLeft - marginRight) / numGradientRects;
</script>

<!-- Legend -->
<svg
  {width}
  {height}
  viewBox="0 0 {width} {height}"
  style:max-width="100%"
  style:overflow="visible"
>
  <g transform="translate(0,{height - marginBottom})" font-size="10">
    <!-- Add color gradient -->
    {#each [...Array(numGradientRects).keys()] as i}
      {@const rectColor = color.interpolator()(i / (numGradientRects - 1))}
      <rect
        x={marginLeft + i * gradientRectWidth}
        y="-9.5"
        width={gradientRectWidth}
        height="10"
        fill={rectColor}
        stroke={rectColor}
      />
    {/each}

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
