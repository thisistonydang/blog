<script lang="ts">
  import { onMount } from "svelte";
  import { useHasTouchScreen } from "@lib/hooks/useHasTouchScreen";

  export let current_path: string;
  export let page: { name: string; path: string; prefetch: boolean };

  let hasTouchScreen = false;
  onMount(() => (hasTouchScreen = useHasTouchScreen()));

  $: is_external = /^https?:\/\//.test(page.path);
</script>

<a
  class="
    text-heading after:bg-accent
    pointer-events-auto opacity-90 after:block
    after:h-0.5
    after:w-0 after:transition-[width] after:duration-200
  "
  class:after:hover:w-full={!hasTouchScreen}
  class:after:w-full={current_path === page.path}
  href={page.path}
  rel={page.prefetch ? "prefetch" : null}
>
  {page.name}{#if is_external}<svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      class="ml-1 inline-block h-[0.85em] w-[0.85em] -translate-y-px"
    >
      <path d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
    </svg><span class="sr-only">(opens in new tab)</span>{/if}
</a>
