<script lang="ts">
  export let width: number | undefined = undefined;
  export let disabled = false;
  export let loading = false;
  export let onClick: ((e: Event) => void) | undefined = undefined;

  let button: HTMLButtonElement;
  let cursor: "wait" | "not-allowed" | null = null;

  $: cursor = loading ? "wait" : disabled ? "not-allowed" : null;

  // If width prop is not given, set button width based on its length when first
  // rendered to prevent change in width if the text changes.
  //
  // Note: A reactive statement is used in order to keep checking the button's
  // width until the first time its length is greater than 0.
  $: if (!width) width = button?.offsetWidth;
</script>

<button
  aria-label={loading ? "loading..." : undefined}
  bind:this={button}
  {disabled}
  on:click={onClick}
  style:width={`${width}px`}
  class:cursor-wait={cursor === "wait"}
  class:cursor-not-allowed={cursor === "not-allowed"}
  class="
    bg-heading text-bg
    hover:bg-bg hover:text-heading hover:border-heading
    group h-[41px]
    rounded px-3 text-center text-sm
    hover:border
  "
>
  {#if loading}
    <svg
      class="
        fill-bg group-hover:fill-heading
        inline-block
        animate-[spin_2s_linear_infinite]
      "
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
