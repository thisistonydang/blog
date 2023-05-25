<script lang="ts">
  import { fly } from "svelte/transition";

  export let isVertical = false;
  export let shiftUp = false;
  export let shiftRight = false;
</script>

<ul
  in:fly={{ duration: 250, x: !isVertical ? -50 : 0, y: isVertical ? 50 : 0 }}
  class="pointer-events-none fixed flex gap-2"
  class:flex-col-reverse={isVertical}
  class:bottom-24={shiftUp}
  class:bottom-8={!shiftUp}
  class:left-24={shiftRight}
  class:left-8={!shiftRight}
>
  <slot />
</ul>
