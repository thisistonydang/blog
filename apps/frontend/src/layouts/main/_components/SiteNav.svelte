<script lang="ts">
  import { nav_pages } from "../_stores/nav_pages";
  import NavLink from "./NavLink.svelte";

  export let current_path: string;
</script>

<nav class="ml-3">
  <ul>
    {#each nav_pages as page}
      <li class="inline-block px-2">
        <NavLink {current_path} {page} />
      </li>
    {/each}
  </ul>
</nav>
