<script>
  import {
    format,
    groups,
    interpolatePiYG,
    pairs,
    quantile,
    range,
    scaleSequential,
    utcFormat,
    utcMonday,
    utcMonth,
    utcMonths,
    utcYear,
  } from "d3";
  import Legend from "./Legend.svelte";

  // Receive data as prop
  export let data;

  const width = 928; // width of the chart
  const cellSize = 17; // height of a day
  const height = cellSize * 7; // height of a week (5 days + padding)

  // Define formatting functions for the axes and tooltips
  const formatValue = format("+.2%");
  const formatClose = format("$,.2f");
  const formatDate = utcFormat("%x");
  const formatDay = (i) => "SMTWTFS"[i];
  const formatMonth = utcFormat("%b");

  // Helpers to compute a day’s position in the week
  const timeWeek = utcMonday;
  const countDay = (i) => (i + 6) % 7;

  // Compute the values used to color the cells: percent change is the difference between the day’s
  // closing value and the previous day’s, as a fraction of the latter.
  data = pairs(
    data,
    ({ Close: previousClose }, { Date: date, Close: close }) => ({
      date: new Date(date),
      value: (close - previousClose) / previousClose,
      close,
    }),
  );

  // Compute the extent of the value, ignore the outliers
  // and define a diverging and symmetric color scale.
  const max = quantile(data, 0.9975, (d) => Math.abs(d.value));
  const color = scaleSequential(interpolatePiYG).domain([-max, +max]);

  // Group data by year, in reverse input order. (Since the dataset is chronological,
  // this will show years in reverse chronological order.)
  const years = groups(data, (d) => d.date.getUTCFullYear()).reverse();

  // A function that draws a thin white line to the left of each month.
  function pathMonth(t) {
    const d = Math.max(0, Math.min(5, countDay(t.getUTCDay())));
    const w = timeWeek.count(utcYear(t), t);
    return `${
      d === 0
        ? `M${w * cellSize},0`
        : d === 5
        ? `M${(w + 1) * cellSize},0`
        : `M${(w + 1) * cellSize},0V${d * cellSize}H${w * cellSize}`
    }V${5 * cellSize}`;
  }
</script>

<Legend {color} title="Daily change" tickFormat="+.0%" marginLeft={40} />

<svg
  {width}
  height={height * years.length}
  viewBox="0 0 {width} {height * years.length}"
  style:max-width="100%"
  style:height="auto"
  style:overflow="visible"
>
  {#each years as year, yearIndex}
    {@const days = year[1].filter((d) => ![0, 6].includes(d.date.getUTCDay()))}
    {@const months = utcMonths(utcMonth(year[1][0].date), year[1].at(-1).date)}

    <g transform="translate(40.5,{height * yearIndex + cellSize * 1.5})">
      <!-- Add year label -->
      <text x="-5" y="-5" font-weight="bold" text-anchor="end">
        {year[0]}
      </text>

      <!-- Add day of week labels -->
      <g text-anchor="end">
        {#each range(1, 6) as weekday}
          <text x="-5" y={(countDay(weekday) + 0.5) * cellSize} dy="0.31em">
            {formatDay(weekday)}
          </text>
        {/each}
      </g>

      <!-- Add one cell block per day -->
      <g>
        {#each days as day}
          <rect
            width={cellSize - 1}
            height={cellSize - 1}
            x={timeWeek.count(utcYear(day.date), day.date) * cellSize + 0.5}
            y={countDay(day.date.getUTCDay()) * cellSize + 0.5}
            fill={color(day.value)}
          >
            <!-- Add title as tooltip -->
            <title>
              {`${formatDate(day.date)}\n${formatValue(day.value)}\n${
                day.close === undefined ? "" : formatClose(day.close)
              }`}
            </title>
          </rect>
        {/each}
      </g>

      <g>
        {#each months as month, monthIndex}
          <g>
            <!-- Add thin white line to the left of each month that is not the first month -->
            {#if monthIndex}
              <path
                fill="none"
                stroke="#fff"
                stroke-width="3"
                d={pathMonth(month)}
              />
            {/if}

            <!-- Add month label -->
            <text
              x={timeWeek.count(utcYear(month), timeWeek.ceil(month)) *
                cellSize +
                2}
              y="-5"
            >
              {formatMonth(month)}
            </text>
          </g>
        {/each}
      </g>
    </g>
  {/each}
</svg>
