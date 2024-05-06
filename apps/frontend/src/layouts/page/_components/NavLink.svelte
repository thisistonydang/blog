<script lang="ts">
  export let current_path: string;
  export let page: { name: string; path: string; prefetch: boolean };
</script>

<a
  class="
    text-heading after:bg-accent
    pointer-events-auto opacity-90 after:block
    after:h-0.5
    after:w-0 after:transition-[width] after:duration-200
    after:hover:w-full
  "
  class:after:w-full={current_path === page.path}
  href={page.path}
  rel={page.prefetch ? "prefetch" : null}
>
  {page.name}
</a>
