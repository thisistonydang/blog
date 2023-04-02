<script context="module" lang="ts">
  export const THEME_TOGGLED_EVENT = "dark_mode_toggle-theme_toggled";
</script>

<script lang="ts">
  import { onMount } from "svelte";

  let mounted = false;
  let clicked = false;
  let toggled = false;

  function handle_click(): void {
    clicked = true;
    toggled = !toggled;
  }

  function handle_keydown(e: KeyboardEvent): void {
    if (!toggled && (e.key === "ArrowRight" || e.key === "l")) {
      clicked = true;
      toggled = true;
    } else if (toggled && (e.key === "ArrowLeft" || e.key === "h")) {
      clicked = true;
      toggled = false;
    }
  }

  $: if (mounted && clicked && toggled) {
    document.documentElement.classList.add("dark");
    localStorage.theme = "dark";
    dispatchEvent(new CustomEvent(THEME_TOGGLED_EVENT));
  } else if (mounted && clicked && !toggled) {
    document.documentElement.classList.remove("dark");
    localStorage.theme = "light";
    dispatchEvent(new CustomEvent(THEME_TOGGLED_EVENT));
  }

  onMount((): void => {
    mounted = true;
    toggled = document.documentElement.classList.contains("dark");
  });
</script>

<button
  class="
    border-heading
    before:bg-heading absolute
    top-1.5 right-0
    h-[26px] w-12
    border
    before:absolute before:top-0.5 before:left-0.5
    before:h-5 before:w-5
    before:duration-100
    hover:opacity-95
    dark:before:left-6
    pointer-events-auto
  "
  class:cursor-not-allowed={!mounted}
  disabled={!mounted}
  aria-label="dark mode toggle"
  on:click={handle_click}
  on:keydown={handle_keydown}
/>
