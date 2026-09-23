<script lang="ts">
  import { fly } from "svelte/transition";

  import { gameToasts } from "../_stores/competitiveState";
</script>

<div
  class="pointer-events-none fixed right-5 top-32 z-[60] flex max-w-[min(320px,80vw)] flex-col gap-2"
  aria-live="polite"
>
  {#each $gameToasts as toast (toast.id)}
    <div
      in:fly={{ x: 50, duration: 250 }}
      class="rounded border border-[#1e40af] bg-[#2563eb]/95 px-4 py-3 text-sm text-white shadow-lg backdrop-blur-sm"
    >
      {toast.message}
    </div>
  {/each}
</div>
