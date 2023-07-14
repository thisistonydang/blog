<script lang="ts">
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";

  const UNHATCHED = "&#x1F95A;";
  const HATCHED = "&#x1F423;";

  let state: "unhatched" | "hatching" | "hatched" = "unhatched";
  let wiggle = false;

  function handleClick() {
    switch (state) {
      case "unhatched":
        state = "hatching";
        setTimeout(() => {
          state = "hatched";
        }, 500);
        break;

      case "hatching":
        break;

      case "hatched":
        state = "unhatched";
    }
  }

  // TODO: Use pure CSS instead.
  onMount(() => setInterval(() => (wiggle = !wiggle), 2000));
</script>

<button
  class="relative"
  class:motion-safe:animate-[wiggle_0.5s]={state === "unhatched" && wiggle}
  class:cursor-help={state === "unhatched"}
  class:animate-shake={state === "hatching"}
  aria-label="Clicking this shows a random easter egg for fun."
  on:click={handleClick}
>
  {#if state === "hatched"}
    <span
      in:fly={{ y: 20 }}
      class="bg-surface absolute -right-40 -top-12 w-48 rounded p-2 text-center text-sm"
    >
      I'm a random easter egg!
    </span>

    <span
      in:fly={{ y: 20 }}
      class="border-t-surface absolute -top-3 left-2.5 h-3 w-3 border-8 border-transparent"
    />
  {/if}

  <div class="m-0 text-4xl">
    {#if state === "hatched"}
      {@html HATCHED}
    {:else}
      {@html UNHATCHED}
    {/if}
  </div>
</button>
