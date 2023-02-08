<script lang="ts">
  export let id: string;
  export let current_section: string;
</script>

<li class="my-5">
  <a href={`#${id}`} aria-label={`Go to ${id} section.`}>
    <svg width="32" height="32">
      <circle
        cx="16"
        cy="16"
        r="15"
        stroke-width="2"
        class="stroke-surface fill-bg"
        class:stroke-text={id === current_section}
      />
    </svg>
  </a>
</li>
