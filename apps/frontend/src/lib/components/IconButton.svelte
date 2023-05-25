<script lang="ts">
  import { onMount } from "svelte";
  import Ping from "./Ping.svelte";
  import Prose from "./Prose.svelte";

  export let ariaLabel: string | undefined = undefined;
  export let ariaLabelToggled: string | undefined = undefined;
  export let isToggled = false;
  export let disabled = false;
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
  aria-label={isToggled ? ariaLabelToggled : ariaLabel}
  {disabled}
  on:click={onClick}
>
  <Prose>
    <span
      class="text-bg flex justify-center"
      class:px-3={isPill}
      class:font-serif={!isPill}
      class:text-2xl={!isPill}
    >
      {#if isToggled}
        <slot name="toggled-text" />
      {:else}
        <slot />
      {/if}
    </span>
  </Prose>

  {#if hasPing}
    <div class="absolute bottom-8 left-8">
      <Ping />
    </div>
  {/if}
</button>
