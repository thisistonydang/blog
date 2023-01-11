<script lang="ts">
  import type { Bin, ScaleLinear, ScaleOrdinal } from "d3";
  import type { Detail } from "@lib/components/Tooltip.svelte";
  import type { DataPoint, Dimensions } from "@lib/types/d3";

  export let dms: Dimensions;
  export let bins: Bin<DataPoint, number>[];
  export let x_scale: ScaleLinear<number, number>;
  export let color_scale: ScaleOrdinal<string, string>;
  export let color_accessor: (d: DataPoint) => string;
  export let bar_width: number;
  export let bar_width_padding: number;
  export let bar_height: number;
  export let bar_height_padding: number;
  export let name_accessor: (d: DataPoint) => string;
  export let has_img_accessor: (d: DataPoint) => boolean;
  export let img_dir: string;
  export let details_array: (d: DataPoint) => Detail[];

  // Tooltip props to pass to parent
  export let display: boolean;
  export let x: number;
  export let y: number;
  export let img_src: string;
  export let img_alt: string;
  export let name: string;
  export let details: Detail[];

  function show_tooltip(e: Event): void {
    const rect = e.target as SVGRectElement;
    const has_img: string | undefined = rect.dataset.has_img;

    display = true;
    x = rect.x.baseVal.value;
    y = rect.y.baseVal.value;
    img_src = `/${img_dir}/${has_img ? rect.dataset.name : "default"}.jpg`;
    img_alt = has_img
      ? `Photo of ${rect.dataset.name}`
      : `Placeholder profile photo for ${rect.dataset.name}`;
    name = rect.dataset.name ?? "";
    details = rect.dataset.details ? JSON.parse(rect.dataset.details) : [];
  }

  function hide_tooltip(): void {
    display = false;
    x = 0;
    y = 0;
    img_src = "";
    img_alt = "";
    name = "";
    details = [];
  }

  function handle_mouseover(e: Event): void {
    if (document.activeElement === document.body) show_tooltip(e);
  }

  function handle_mouseout(): void {
    if (document.activeElement === document.body) hide_tooltip();
  }
</script>

<g class="cursor-crosshair">
  {#each bins as bin}
    {#each bin as d, i}
      <rect
        class={`fill-[${color_scale(color_accessor(d))}]`}
        x={bin.x0 ? Math.round(x_scale(bin.x0) + bar_width_padding / 2) : 0}
        y={dms.bounded_height -
          bar_height -
          (bar_height + bar_height_padding) * i}
        width={bar_width}
        height={bar_height}
        data-name={name_accessor(d)}
        data-has_img={has_img_accessor(d) ? "true" : null}
        data-details={JSON.stringify(details_array(d))}
        on:mouseover={handle_mouseover}
        on:mouseout={handle_mouseout}
        on:focus={show_tooltip}
        on:blur={hide_tooltip}
      />
    {/each}
  {/each}
</g>
