<script lang="ts">
  import { onMount } from "svelte";

  export let width: string | undefined = undefined;
  export let loading = false;
  export let onclick: string | undefined = undefined;
  export let handle_click: (() => void) | undefined = undefined;

  let button: HTMLButtonElement;

  onMount((): void => {
    // Set button width based on slotted text to prevent change in width when
    // loading spinner shows.
    if (!width) width = `${button.offsetWidth}px`;
  });
</script>

<button
  aria-label={loading ? "loading..." : undefined}
  bind:this={button}
  disabled={loading}
  {onclick}
  on:click={handle_click}
  style:width
  class:cursor-wait={loading}
  class="
    bg-heading text-bg
    h-[41px] px-3
    text-center text-sm
    hover:opacity-95
  "
>
  {#if loading}
    <svg
      class="fill-bg inline-block animate-[spin_2s_linear_infinite]"
      width="1.4rem"
      height="1.4rem"
      viewBox="0 0 512 512"
    >
      <path
        d="
          M304 48c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5
          48-48zm0 416c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48
          48s48-21.5 48-48zM48 304c26.5 0 48-21.5 48-48s-21.5-48-48-48s-48
          21.5-48 48s21.5 48 48 48zm464-48c0-26.5-21.5-48-48-48s-48 21.5-48
          48s21.5 48 48 48s48-21.5 48-48zM142.9 437c18.7-18.7 18.7-49.1
          0-67.9s-49.1-18.7-67.9 0s-18.7 49.1 0 67.9s49.1 18.7 67.9
          0zm0-294.2c18.7-18.7 18.7-49.1 0-67.9S93.7 56.2 75 75s-18.7 49.1 0
          67.9s49.1 18.7 67.9 0zM369.1 437c18.7 18.7 49.1 18.7 67.9 0s18.7-49.1
          0-67.9s-49.1-18.7-67.9 0s-18.7 49.1 0 67.9z
        "
      />
    </svg>
  {:else}
    <slot />
  {/if}
</button>
