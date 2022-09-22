<script lang="ts">
  import { onMount } from "svelte";

  let mounted = false;
  let clicked = false;
  let toggled = false;

  const handle_click = (): void => {
    clicked = true;
    toggled = !toggled;
  };

  const handle_keydown = (e: KeyboardEvent): void => {
    if (!toggled && (e.key === "ArrowRight" || e.key === "l")) {
      clicked = true;
      toggled = true;
    } else if (toggled && (e.key === "ArrowLeft" || e.key === "h")) {
      clicked = true;
      toggled = false;
    }
  };

  $: if (mounted && clicked && toggled) {
    document.documentElement.classList.add("dark");
    localStorage.theme = "dark";
  } else if (mounted && clicked && !toggled) {
    document.documentElement.classList.remove("dark");
    localStorage.theme = "light";
  }

  onMount((): void => {
    mounted = true;
    toggled = document.documentElement.classList.contains("dark");
  });
</script>

<button
  class="
    absolute
    top-0 right-0
    w-12 h-[26px]
    border border-heading
    cursor-pointer
    hover:opacity-95
    before:absolute
    before:top-0.5 before:left-0.5 dark:before:left-6
    before:w-5 before:h-5
    before:bg-heading
    before:duration-100
  "
  aria-label="dark mode toggle"
  on:click={handle_click}
  on:keydown={handle_keydown}
/>
