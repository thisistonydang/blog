<script lang="ts">
  import { onMount } from "svelte";
  import Button from "@lib/components/Button.svelte";
  import Prose from "@lib/components/Prose.svelte";

  export let isModal = false;
  export let isProse = false;
  export let hasPadding = false;
  export let buttonWidth: number | undefined = undefined;
  export let confirmText: string | undefined = undefined;
  export let cancelText: string | undefined = undefined;
  export let onConfirm: ((e: Event) => void) | undefined = undefined;
  export let onCancel: ((e: Event) => void) | undefined = undefined;
  export let onClose: ((e: Event) => void) | undefined = undefined;

  let dialog: HTMLDialogElement;

  onMount(() => (isModal ? dialog.showModal() : dialog.show()));
</script>

<dialog
  bind:this={dialog}
  class="
    bg-surface/95 border-text relative z-50
    animate-[fade-in_0.25s] animate-[fly-up_0.25s]
    rounded border drop-shadow
  "
  class:p-5={hasPadding}
  class:p-0={!hasPadding}
  on:close={onClose}
>
  {#if isProse}
    <Prose><slot /></Prose>
  {:else}
    <slot />
  {/if}

  <form
    method="dialog"
    class="m-auto flex flex-col gap-3"
    style:width={buttonWidth ? `${buttonWidth}px` : ""}
  >
    {#if confirmText}
      <Button onClick={onConfirm}>
        {confirmText}
      </Button>
    {/if}

    {#if cancelText}
      <Button onClick={onCancel}>
        {cancelText}
      </Button>
    {/if}
  </form>
</dialog>
