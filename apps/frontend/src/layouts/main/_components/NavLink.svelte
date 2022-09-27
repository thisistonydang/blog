<script lang="ts">
  export let current_path: string;
  export let page: { name: string; path: string };
</script>

<a
  class="
    text-heading opacity-90
    after:block after:h-0.5 after:w-0
    after:bg-accent
    after:duration-200 after:hover:w-full
  "
  class:after:w-full={current_path === page.path}
  href={page.path}
>
  {@html page.name}
</a>
