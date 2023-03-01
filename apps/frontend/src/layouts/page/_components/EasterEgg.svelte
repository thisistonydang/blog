<script lang="ts">
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";

  const UNHATCHED = "&#x1F95A;";
  const HATCHED = "&#x1F423;";

  let checked = false;
  let egg = UNHATCHED;
  let wiggle = false;

  function handle_keydown(e: KeyboardEvent): void {
    if (e.key === "Enter" || e.key === " ") checked = !checked;
  }

  $: if (checked) setTimeout((): string => (egg = HATCHED), 500);
  else egg = UNHATCHED;

  $: message_is_visible = egg === HATCHED;

  onMount(() => setInterval(() => (wiggle = !wiggle), 2000));
</script>

<input id="easter-egg" type="checkbox" class="peer hidden" bind:checked />
<label
  for="easter-egg"
  class="
    peer-checked:animate-shake
    relative
    cursor-help
    peer-checked:cursor-pointer
  "
  class:motion-safe:animate-[wiggle_0.5s]={wiggle}
  aria-label="toggling this checkbox shows a random easter egg for fun"
  on:keydown={handle_keydown}
>
  {#if message_is_visible}
    <span
      in:fly={{ y: 20 }}
      class="
        bg-surface absolute
        -top-12
        w-48
        rounded p-2
        text-center
        text-sm
      "
    >
      I'm a random easter egg!
    </span>

    <span
      in:fly={{ y: 20 }}
      class="
        border-t-surface absolute -top-3
        left-2.5 h-3
        w-3 border-8 border-transparent
      "
    />
  {/if}

  <div class="m-0 text-4xl">
    {@html egg}
  </div>
</label>
