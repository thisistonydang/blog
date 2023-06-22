<script>
  import * as d3 from "d3";

  // Receive plot data as prop.
  export let data;

  // The chart dimensions and margins as optional props.
  export let width = 928;
  export let height = 500;
  export let marginTop = 30;
  export let marginRight = 0;
  export let marginBottom = 50;
  export let marginLeft = 40;

  // Create the x (horizontal position) scale.
  const xScale = d3
    .scaleBand()
    .domain(
      // Sort the data in descending frequency
      d3.groupSort(
        data,
        ([d]) => -d.frequency,
        (d) => d.letter
      )
    )
    .range([marginLeft, width - marginRight])
    .padding(0.1);

  // Create the y (vertical position) scale.
  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.frequency)])
    .range([height - marginBottom, marginTop]);

  // Get max y value from domain to use when creating y-axis ticks.
  const yMax = Math.ceil(yScale.domain()[1] * 100);
</script>

<svg
  {width}
  {height}
  viewBox="0 0 {width} {height}"
  style:max-width="100%"
  style:height="auto"
>
  <!-- Add a rect for each bar. -->
  <g fill="steelblue">
    {#each data as d}
      <rect
        x={xScale(d.letter)}
        y={yScale(d.frequency)}
        height={yScale(0) - yScale(d.frequency)}
        width={xScale.bandwidth()}
      />
    {/each}
  </g>

  <!-- X-Axis -->
  <g transform="translate(0,{height - marginBottom})">
    <line stroke="currentColor" x1={marginLeft - 6} x2={width} />

    {#each data as d}
      <!-- Ticks -->
      <line
        stroke="currentColor"
        x1={xScale(d.letter) + xScale.bandwidth() / 2}
        x2={xScale(d.letter) + xScale.bandwidth() / 2}
        y1={0}
        y2={6}
      />

      <!-- Tick Labels -->
      <text
        fill="currentColor"
        text-anchor="middle"
        x={xScale(d.letter) + xScale.bandwidth() / 2}
        y={22}
      >
        {d.letter}
      </text>
    {/each}

    <!-- X-Axis Label -->
    <text fill="currentColor" x={width / 2} y={50}>letter</text>
  </g>

  <!-- Y-Axis -->
  <g transform="translate({marginLeft},0)">
    {#each [...Array(yMax).keys()] as d}
      <!-- 
        Ticks. 
        Note: First tick is skipped since the x-axis already acts as a tick. 
      -->
      {#if d !== 0}
        <line
          stroke="currentColor"
          x1={0}
          x2={-6}
          y1={yScale(d / 100)}
          y2={yScale(d / 100)}
        />
      {/if}

      <!-- Tick Labels -->
      <text
        fill="currentColor"
        text-anchor="end"
        dominant-baseline="middle"
        x={-9}
        y={yScale(d / 100)}
      >
        {d}
      </text>
    {/each}

    <!-- Y-Axis Label -->
    <text fill="currentColor" text-anchor="start" x={-marginLeft} y={15}>
      ↑ frequency (%)
    </text>
  </g>
</svg>
