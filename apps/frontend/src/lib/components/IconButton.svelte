<script lang="ts">
  import { onMount } from "svelte";
  import Ping from "./Ping.svelte";
  import Prose from "./Prose.svelte";

  export let ariaLabel: string | undefined = undefined;
  export let ariaLabelToggled: string | undefined = undefined;
  export let isToggled = false;
  export let disabled = false;
  export let loading = false;
  export let hasPing = false;
  export let isPill = false;
  export let fixedWidth: number | undefined = undefined;
  export let onClick: () => void;

  let mounted = false;
  onMount(() => (mounted = true));
</script>

<button
  class="
    bg-text pointer-events-auto relative
    h-10 rounded-full drop-shadow
    disabled:cursor-not-allowed disabled:opacity-75
  "
  class:min-w-[40px]={!fixedWidth}
  class:cursor-not-allowed={!mounted}
  style:width={`${fixedWidth}px`}
  aria-label={loading ? "loading..." : isToggled ? ariaLabelToggled : ariaLabel}
  aria-busy={loading}
  disabled={disabled || loading}
  on:click={onClick}
>
  <Prose>
    <span
      class="text-bg flex justify-center"
      class:px-3={isPill}
      class:font-serif={!isPill}
      class:text-2xl={!isPill}
    >
      {#if loading}
        <span class="sr-only">Loading</span>
        <svg
          class="fill-bg inline-block animate-[spin_2s_linear_infinite]"
          width="1.25rem"
          height="1.25rem"
          viewBox="0 0 512 512"
          aria-hidden="true"
        >
          <path
            d="M304 48c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zm0 416c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zM48 304c26.5 0 48-21.5 48-48s-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48zm464-48c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zM142.9 437c18.7-18.7 18.7-49.1 0-67.9s-49.1-18.7-67.9 0s-18.7 49.1 0 67.9s49.1 18.7 67.9 0zm0-294.2c18.7-18.7 18.7-49.1 0-67.9S93.7 56.2 75 75s-18.7 49.1 0 67.9s49.1 18.7 67.9 0zM369.1 437c18.7 18.7 49.1 18.7 67.9 0s18.7-49.1 0-67.9s-49.1-18.7-67.9 0s-18.7 49.1 0 67.9z"
          />
        </svg>
      {:else if isToggled}
        <slot name="toggled-text" />
      {:else}
        <slot />
      {/if}
    </span>
  </Prose>

  {#if hasPing}
    <div class="absolute bottom-8">
      <Ping />
    </div>
  {/if}
</button>
