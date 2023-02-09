<script lang="ts">
  export let href: string;
  export let prefetch = true;
</script>

<span class="not-prose">
  <a
    {href}
    rel={prefetch ? "prefetch" : null}
    class="
      bg-heading text-bg border-heading
      hover:bg-bg hover:text-heading
      cursor-pointer border
      p-[11px]
      text-center text-sm
    "
  >
    <slot />
  </a>
</span>
