<script lang="ts">
  import { onMount } from "svelte";
  import { BarChart } from "echarts/charts";
  import {
    AriaComponent,
    GraphicComponent,
    GridComponent,
    TooltipComponent,
  } from "echarts/components";
  import { init, use, type ECharts, type EChartsOption } from "echarts/core";
  import { SVGRenderer } from "echarts/renderers";

  import wikipediaPages from "../_data/wikipedia-pages.json";

  use([
    AriaComponent,
    BarChart,
    GraphicComponent,
    GridComponent,
    SVGRenderer,
    TooltipComponent,
  ]);

  type Athlete = {
    name: string;
    country: string;
  };

  type Podium = {
    year: number;
    gold: Athlete[];
    silver: Athlete[];
    bronze: Athlete[];
  };

  type MedalCounts = {
    gold: number;
    silver: number;
    bronze: number;
  };

  export let heading: string;
  export let discipline: string;
  export let winners: Podium[];

  type BarDatum = {
    name: string;
    value: [number, string, number, number, number];
    medals: MedalCounts;
    countryCode: string;
    countryFlag: string;
    cursor: "default" | "pointer";
    wikipediaTitle?: string;
    itemStyle: {
      color: string;
      opacity: number;
      borderRadius: [number, number, number, number];
    };
  };

  const firstYear = Math.min(...winners.map(({ year }) => year));
  const lastYear = Math.max(...winners.map(({ year }) => year));
  const frameDuration = 1000;
  const countryColors: Record<string, string> = {
    Australia: "#17becf",
    Austria: "#af7aa1",
    Belgium: "#59a14f",
    Canada: "#e377c2",
    China: "#d62728",
    "Czech Republic": "#8c564b",
    France: "#4e79a7",
    Germany: "#7f7f7f",
    Indonesia: "#ff7f0e",
    Iran: "#2ca02c",
    Italy: "#f28e2c",
    Japan: "#9c755f",
    Netherlands: "#bcbd22",
    Poland: "#c44e52",
    Russia: "#1f77b4",
    Slovenia: "#edc949",
    "South Korea": "#ff9da7",
    Spain: "#e5ae38",
    Switzerland: "#76b7b2",
    Ukraine: "#2a9d8f",
    "United Kingdom": "#bab0ab",
    "United States": "#e15759",
  };
  const countryCodes: Record<string, string> = {
    Australia: "AU",
    Austria: "AT",
    Belgium: "BE",
    Canada: "CA",
    China: "CN",
    "Czech Republic": "CZ",
    France: "FR",
    Germany: "DE",
    Indonesia: "ID",
    Iran: "IR",
    Italy: "IT",
    Japan: "JP",
    Netherlands: "NL",
    Poland: "PL",
    Russia: "RU",
    Slovenia: "SI",
    "South Korea": "KR",
    Spain: "ES",
    Switzerland: "CH",
    Ukraine: "UA",
    "United Kingdom": "GB",
    "United States": "US",
  };

  function countryFlag(country: string) {
    return (countryCodes[country] ?? "")
      .split("")
      .map((letter) => String.fromCodePoint(127397 + letter.charCodeAt(0)))
      .join("");
  }

  const athletes = winners.flatMap(({ gold, silver, bronze }) => [
    ...gold,
    ...silver,
    ...bronze,
  ]);
  const countryByAthlete = new Map(
    athletes.map(({ name, country }) => [name, country])
  );
  const podiumsByYear = new Map(winners.map((podium) => [podium.year, podium]));
  const years = Array.from(
    { length: lastYear - firstYear + 1 },
    (_, index) => firstYear + index
  );

  let container: HTMLDivElement;
  let chart: ECharts;
  let frameIndex = 0;
  let timer: number | undefined;
  let isRunning = false;
  let isFinished = false;

  function dataForFrame(index: number): BarDatum[] {
    const totals = new Map<string, MedalCounts>();

    function addMedal(name: string, medal: keyof MedalCounts) {
      const medals = totals.get(name) ?? { gold: 0, silver: 0, bronze: 0 };
      medals[medal] += 1;
      totals.set(name, medals);
    }

    for (let yearIndex = 0; yearIndex <= index; yearIndex += 1) {
      const podium = podiumsByYear.get(years[yearIndex]);
      if (!podium) continue;

      podium.gold.forEach(({ name }) => addMedal(name, "gold"));
      podium.silver.forEach(({ name }) => addMedal(name, "silver"));
      podium.bronze.forEach(({ name }) => addMedal(name, "bronze"));
    }

    return Array.from(totals, ([name, medals]) => {
      // Small decimal values make ECharts use silver and bronze as tiebreakers
      // without visibly changing the gold-medal bar length.
      const rankValue =
        medals.gold + medals.silver / 100 + medals.bronze / 10_000;

      const country = countryByAthlete.get(name) ?? "";
      const wikipediaTitle = (wikipediaPages as Record<string, string>)[name];

      return {
        name,
        value: [
          rankValue,
          name,
          medals.gold,
          medals.silver,
          medals.bronze,
        ],
        medals,
        countryCode: countryCodes[country] ?? "",
        countryFlag: countryFlag(country),
        cursor: wikipediaTitle ? "pointer" : "default",
        wikipediaTitle,
        itemStyle: {
          color: countryColors[country] ?? "#4e79a7",
          opacity: 0.85,
          borderRadius: [0, 4, 4, 0],
        },
      };
    }).filter(({ medals }) => medals.gold > 0);
  }

  function cssColor(variable: string) {
    const channels = getComputedStyle(document.documentElement)
      .getPropertyValue(variable)
      .trim();
    return `rgb(${channels})`;
  }

  function optionForFrame(index: number, animate = true): EChartsOption {
    const textColor = cssColor("--text");
    const isDark = document.documentElement.classList.contains("dark");
    const nameColor = isDark ? "#ffffff" : "#000000";
    const backgroundColor = cssColor("--bg");
    const tooltipBorderColor = cssColor("--surface");
    const year = years[index];
    const frameData = dataForFrame(index);
    const maxGold = Math.max(
      1,
      ...frameData.map(({ medals }) => medals.gold)
    );
    const flagStyles = Object.fromEntries(
      frameData.map(({ countryCode }) => [
        `flag_${countryCode}`,
        {
          width: 18,
          height: 12,
          backgroundColor: {
            image: `/flags/${countryCode.toLowerCase()}.svg`,
          },
        },
      ])
    );

    return {
      animationDuration: animate ? frameDuration : 0,
      animationDurationUpdate: animate ? frameDuration : 0,
      animationEasing: "linear",
      animationEasingUpdate: "linear",
      aria: {
        enabled: true,
        description: `Cumulative ${heading.toLowerCase()} World Climbing Series podium finishes through ${year}. Athletes are ranked by wins, then second-place finishes, then third-place finishes.`,
      },
      grid: { top: 24, right: 8, bottom: 8, left: 0 },
      tooltip: {
        trigger: "item",
        backgroundColor,
        borderColor: tooltipBorderColor,
        textStyle: { color: textColor },
        formatter: (params: { data: BarDatum }) => {
          const { name, medals } = params.data;
          const lines = [
            `<strong>${name}</strong>`,
            `🥇 Winner: ${medals.gold}`,
            `🥈 Second: ${medals.silver}`,
            `🥉 Third: ${medals.bronze}`,
          ];
          if (params.data.wikipediaTitle) {
            lines.push("<small>Click to view on Wikipedia ↗</small>");
          }
          return lines.join("<br>");
        },
      },
      xAxis: {
        type: "value",
        position: "top",
        max: maxGold,
        minInterval: 1,
        axisLabel: {
          color: textColor,
          formatter: (value: number) =>
            value === 0 ? "" : String(Math.floor(value)),
        },
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: {
          show: true,
          lineStyle: { color: textColor, opacity: 0.2 },
        },
      },
      yAxis: {
        type: "category",
        inverse: true,
        max: 9,
        axisLabel: { show: false },
        axisLine: { show: false },
        axisTick: { show: false },
      },
      series: [
        {
          type: "bar",
          realtimeSort: true,
          dimensions: ["rank", "climber", "gold", "silver", "bronze"],
          encode: { x: "rank", y: "climber" },
          data: frameData,
          barWidth: "82%",
          label: {
            show: true,
            position: "insideRight",
            align: "right",
            color: nameColor,
            fontFamily: "system-ui, sans-serif",
            fontSize: 9,
            fontWeight: "bold",
            rich: {
              ...flagStyles,
              name: {
                color: nameColor,
                fontFamily: "system-ui, sans-serif",
                fontSize: 9,
                fontWeight: "bold",
              },
            },
            formatter: (params: { data: BarDatum }) =>
              `{flag_${params.data.countryCode}| } {name|${params.data.name}  ${params.data.medals.gold}}`,
          },
        },
      ],
      graphic: {
        elements: [
          {
            type: "text",
            right: 24,
            bottom: 24,
            style: {
              text: String(year),
              fill: textColor,
              font: "bold 48px system-ui, sans-serif",
              opacity: 0.35,
            },
          },
        ],
      },
    };
  }

  function renderFrame(animate = true) {
    chart.setOption(optionForFrame(frameIndex, animate), {
      replaceMerge: ["graphic"],
    });
  }

  function stop() {
    if (timer !== undefined) window.clearTimeout(timer);
    timer = undefined;
    isRunning = false;
  }

  function scheduleNextFrame() {
    if (!isRunning) return;

    timer = window.setTimeout(() => {
      if (frameIndex >= years.length - 1) {
        isFinished = true;
        stop();
        return;
      }

      frameIndex += 1;
      renderFrame();
      scheduleNextFrame();
    }, frameDuration);
  }

  function play() {
    if (isFinished) {
      frameIndex = 0;
      isFinished = false;
      renderFrame(false);
    }

    isRunning = true;
    scheduleNextFrame();
  }

  function togglePlayback() {
    if (isRunning) stop();
    else play();
  }

  function restart() {
    stop();
    frameIndex = 0;
    isFinished = false;
    renderFrame(false);
    play();
  }

  function seek(event: Event) {
    stop();
    frameIndex = Number((event.currentTarget as HTMLInputElement).value);
    isFinished = frameIndex === years.length - 1;
    renderFrame(false);
  }

  onMount(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    frameIndex = reduceMotion ? years.length - 1 : 0;
    isFinished = reduceMotion;

    chart = init(container, undefined, { renderer: "svg" });
    chart.on("click", (params) => {
      const datum = params.data as BarDatum;
      if (!datum?.wikipediaTitle) return;

      const title = encodeURIComponent(
        datum.wikipediaTitle.replaceAll(" ", "_")
      );
      window.open(
        `https://en.wikipedia.org/wiki/${title}`,
        "_blank",
        "noopener,noreferrer"
      );
    });
    renderFrame(false);

    const resizeObserver = new ResizeObserver(() => chart.resize());
    resizeObserver.observe(container);

    const themeObserver = new MutationObserver(() => renderFrame(false));
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    if (!reduceMotion) play();

    return () => {
      stop();
      resizeObserver.disconnect();
      themeObserver.disconnect();
      chart.dispose();
    };
  });
</script>

<section aria-labelledby={`${discipline}-winners-heading`}>
  <h2 id={`${discipline}-winners-heading`}>{heading}</h2>

  <figure>
    <div
      class="chart"
      bind:this={container}
      role="img"
      aria-label={`Animated bar chart showing cumulative ${heading.toLowerCase()} World Climbing Series podium finishes by year, ranked by wins, then second-place finishes, then third-place finishes.`}
    ></div>

    <div class="controls" aria-label="Chart animation controls">
    <button
      class="control-button"
      type="button"
      on:click={togglePlayback}
      aria-label={isRunning ? "Pause animation" : isFinished ? "Replay animation" : "Play animation"}
      title={isRunning ? "Pause" : isFinished ? "Replay" : "Play"}
    >
      {#if isRunning}
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7 5h4v14H7zm6 0h4v14h-4z" />
        </svg>
      {:else}
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M8 5v14l11-7z" />
        </svg>
      {/if}
    </button>

    <button
      class="control-button"
      type="button"
      on:click={restart}
      aria-label="Restart animation"
      title="Restart"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M17.65 6.35A8 8 0 1 0 20 12h-2a6 6 0 1 1-1.76-4.24L13 11h8V3z" />
      </svg>
    </button>

    <input
      class="timeline"
      type="range"
      min="0"
      max={years.length - 1}
      step="1"
      value={frameIndex}
      style={`--progress: ${(frameIndex / (years.length - 1)) * 100}%`}
      on:pointerdown={stop}
      on:input={seek}
      aria-label="Chart year"
      aria-valuetext={String(years[frameIndex])}
      />
    </div>

    <figcaption>
      Cumulative World Climbing Series podium finishes from {firstYear} to
      {lastYear}. Ties are broken by second-place finishes, then third-place
      finishes. No series was held in 2020.
    </figcaption>
  </figure>
</section>

<style>
  figure {
    margin: 0;
    border: 0;
  }

  figcaption {
    margin-top: 0.75rem;
    border: 0;
    color: rgb(var(--text));
    font-size: 0.8125rem;
    text-align: center;
  }

  .chart {
    width: 100%;
    aspect-ratio: 928 / 512;
  }

  .controls {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    margin-top: 0.5rem;
    color: rgb(var(--heading));
    border: 0;
  }

  .control-button {
    display: grid;
    flex: 0 0 auto;
    width: 2rem;
    height: 2rem;
    padding: 0.35rem;
    color: inherit;
    background: transparent;
    border: 0;
    border-radius: 9999px;
    cursor: pointer;
    place-items: center;
  }

  .control-button:hover {
    color: rgb(var(--bg));
    background: rgb(var(--heading));
  }

  .control-button:focus-visible,
  .timeline:focus-visible {
    outline: 3px solid rgb(var(--accent));
    outline-offset: 2px;
  }

  .control-button svg {
    width: 1.25rem;
    height: 1.25rem;
    fill: currentColor;
  }

  .timeline {
    width: 100%;
    height: 1.25rem;
    margin: 0;
    appearance: none;
    background: transparent;
    cursor: pointer;
  }

  .timeline::-webkit-slider-runnable-track {
    height: 0.3rem;
    background: linear-gradient(
      to right,
      rgb(var(--heading)) 0 var(--progress),
      rgb(var(--surface)) var(--progress) 100%
    );
    border-radius: 9999px;
  }

  .timeline::-moz-range-track {
    height: 0.3rem;
    background: rgb(var(--surface));
    border-radius: 9999px;
  }

  .timeline::-moz-range-progress {
    height: 0.3rem;
    background: rgb(var(--heading));
    border-radius: 9999px;
  }

  .timeline::-webkit-slider-thumb {
    width: 0.9rem;
    height: 0.9rem;
    margin-top: -0.3rem;
    appearance: none;
    background: rgb(var(--heading));
    border: 2px solid rgb(var(--bg));
    border-radius: 9999px;
  }

  .timeline::-moz-range-thumb {
    width: 0.9rem;
    height: 0.9rem;
    background: rgb(var(--heading));
    border: 2px solid rgb(var(--bg));
    border-radius: 9999px;
  }

</style>
