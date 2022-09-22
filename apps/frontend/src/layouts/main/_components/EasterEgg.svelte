<script lang="ts">
  import { fly } from "svelte/transition";

  const UNHATCHED = "&#x1F95A;";
  const HATCHED = "&#x1F423;";

  let checked = false;
  let egg = UNHATCHED;

  const handle_keydown = (e: KeyboardEvent): void => {
    if (e.key === "Enter" || e.key === " ") checked = !checked;
  };

  $: if (checked) setTimeout((): string => (egg = HATCHED), 500);
  else egg = UNHATCHED;

  $: message_is_visible = egg === HATCHED;
</script>

<input id="easter-egg" type="checkbox" class="peer hidden" bind:checked />
<label
  for="easter-egg"
  class="
    relative
    cursor-help
    hover:animate-[wiggle_0.5s]
    peer-checked:cursor-pointer
    peer-checked:animate-shake
  "
  tabindex="0"
  aria-label="toggling this checkbox shows a random easter egg for fun"
  on:keydown={handle_keydown}
>
  {#if message_is_visible}
    <span
      in:fly={{ y: 20 }}
      class="
        absolute -top-12
        w-48
        p-2
        text-sm text-center
        bg-surface
      "
    >
      I'm a random easter egg!
    </span>

    <span
      in:fly={{ y: 20 }}
      class="
        absolute -top-3 left-2.5
        w-3 h-3
        border-8 border-transparent border-t-surface
      "
    />
  {/if}

  <p class="m-0 text-4xl">
    {@html egg}
  </p>
</label>
