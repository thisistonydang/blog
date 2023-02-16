<script lang="ts">
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";

  let is_online = true;

  onMount(() => {
    is_online = "onLine" in navigator ? navigator.onLine : true;
  });
</script>

<svelte:window
  on:online={() => (is_online = true)}
  on:offline={() => (is_online = false)}
/>

{#if !is_online}
  <dialog
    open
    transition:fly={{ y: -50 }}
    class="text-text bg-surface/[.975] fixed z-[99] rounded"
  >
    <div class="flex items-center gap-3">
      <p>You are currently offline.</p>
      <form method="dialog">
        <button aria-label="Dismiss." class="cursor-pointer text-2xl">
          &times
        </button>
      </form>
    </div>
  </dialog>
{/if}
