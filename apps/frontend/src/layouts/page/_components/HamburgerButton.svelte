<script lang="ts">
  import { hamburger_menu_is_open } from "../_stores/hamburger_menu_is_open";

  function handle_click(): void {
    $hamburger_menu_is_open = !$hamburger_menu_is_open;
  }
</script>

<button
  class="cursor-pointer hover:opacity-95 sm:hidden"
  aria-label="toggle hamburger menu"
  on:click={handle_click}
>
  <div
    class="bg-heading my-1.5 h-0.5 w-6 transition-transform duration-100"
    class:rotate-45={$hamburger_menu_is_open}
    class:translate-x-1={$hamburger_menu_is_open}
    class:translate-y-1.5={$hamburger_menu_is_open}
  />
  <div
    class="bg-heading my-1.5 h-0.5 w-6 transition-transform duration-100"
    class:opacity-0={$hamburger_menu_is_open}
  />
  <div
    class="bg-heading my-1.5 h-0.5 w-6 transition-transform duration-100"
    class:-rotate-45={$hamburger_menu_is_open}
    class:translate-x-1={$hamburger_menu_is_open}
    class:-translate-y-1.5={$hamburger_menu_is_open}
  />
</button>
