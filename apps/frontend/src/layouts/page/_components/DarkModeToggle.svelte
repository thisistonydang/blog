<script context="module" lang="ts">
  export const THEME_TOGGLED_EVENT = "dark_mode_toggle-theme_toggled";
</script>

<script lang="ts">
  import { onMount } from "svelte";
  import { theme } from "../_stores/theme";

  let mounted = false;
  let userExplicitlyChoseTheme = false;

  function handleClick(): void {
    userExplicitlyChoseTheme = true;
    $theme = $theme === "dark" ? "light" : "dark";
  }

  function handleKeydown(e: KeyboardEvent): void {
    if ($theme !== "dark" && (e.key === "ArrowRight" || e.key === "l")) {
      userExplicitlyChoseTheme = true;
      $theme = "dark";
    } else if ($theme === "dark" && (e.key === "ArrowLeft" || e.key === "h")) {
      userExplicitlyChoseTheme = true;
      $theme = "light";
    }
  }

  $: if (mounted && userExplicitlyChoseTheme && $theme === "dark") {
    document.documentElement.classList.add("dark");
    localStorage.theme = "dark";
    window.dispatchEvent(new CustomEvent(THEME_TOGGLED_EVENT));
  } else if (mounted && userExplicitlyChoseTheme && $theme === "light") {
    document.documentElement.classList.remove("dark");
    localStorage.theme = "light";
    window.dispatchEvent(new CustomEvent(THEME_TOGGLED_EVENT));
  }

  onMount((): void => {
    mounted = true;
    $theme = document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";
  });
</script>

<!-- Keep theme synced across different windows and tabs. -->
<svelte:window
  on:storage={() => {
    if ($theme !== localStorage.theme) {
      userExplicitlyChoseTheme = true;
      $theme = localStorage.theme;
    }
  }}
/>

<button
  class="
    border-heading before:bg-heading
    pointer-events-auto
    absolute right-0 top-1.5 h-[26px] w-12
    border
    before:absolute before:left-0.5 before:top-0.5 before:h-5 before:w-5
    before:duration-100
    hover:opacity-95
    dark:before:left-6
  "
  class:cursor-not-allowed={!mounted}
  disabled={!mounted}
  aria-label="dark mode toggle"
  on:click={handleClick}
  on:keydown={handleKeydown}
/>
