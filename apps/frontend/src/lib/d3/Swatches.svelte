<script>
  export let color;
  export let swatchWidth = 15;
  export let swatchHeight = 15;
  export let marginLeft = 0;
</script>

<div
  style="
    display: flex; 
    align-items: center; 
    min-height: 33px; 
    margin-left: {marginLeft}px; 
    font: 10px sans-serif;
  "
>
  {#each color.domain() as category}
    <span
      class="border"
      style="
        display: inline-flex;
        align-items: center; 
        margin-right: 1em; 
        --color: {color(category)};
        --width: {swatchWidth}px;
        --height: {swatchHeight}px;
      "
    >
      {category}
    </span>
  {/each}
</div>

<style>
  span::before {
    content: "";
    width: var(--width);
    height: var(--height);
    margin-right: 0.5em;
    background: var(--color);
  }
</style>
