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

  const theme_toggled_event = new CustomEvent("theme-toggled");

  $: if (mounted && clicked && toggled) {
    document.documentElement.classList.add("dark");
    localStorage.theme = "dark";
    dispatchEvent(theme_toggled_event);
  } else if (mounted && clicked && !toggled) {
    document.documentElement.classList.remove("dark");
    localStorage.theme = "light";
    dispatchEvent(theme_toggled_event);
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
  "
  class:cursor-not-allowed={!mounted}
  disabled={!mounted}
  aria-label="dark mode toggle"
  on:click={handle_click}
  on:keydown={handle_keydown}
/>
