<script lang="ts">
  import { hamburger_menu_is_open } from "../_stores/hamburger_menu_is_open";
  import { nav_pages } from "../_stores/nav_pages";
  import NavLink from "./NavLink.svelte";

  export let current_path: string;
</script>

{#if $hamburger_menu_is_open}
  <nav class="-mt-5 sm:hidden">
    <ul class="ml-10 mb-7">
      {#each nav_pages as page}
        <li class="w-fit py-1.5">
          <NavLink {current_path} {page} />
        </li>
      {/each}
    </ul>
  </nav>
  <div class="prose dark:prose-invert mb-10 sm:hidden">
    <hr />
  </div>
{/if}
