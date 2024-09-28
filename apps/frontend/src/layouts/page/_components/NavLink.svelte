<script lang="ts">
  import { onMount } from "svelte";
  import { useHasTouchScreen } from "@lib/hooks/useHasTouchScreen";

  export let current_path: string;
  export let page: { name: string; path: string; prefetch: boolean };

  let hasTouchScreen = false;
  onMount(() => (hasTouchScreen = useHasTouchScreen()));
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
  {page.name}
</a>
