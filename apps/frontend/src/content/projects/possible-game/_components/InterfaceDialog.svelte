<script lang="ts">
  import Dialog from "@lib/components/Dialog.svelte";
  import { interfaceState } from "../_stores/appState";

  export let title: string;

  function close(e: Event) {
    e.preventDefault();
    $interfaceState = "opened";
  }
</script>

<Dialog
  isProse
  hasPadding
  buttonWidth={100}
  confirmText="CLOSE"
  onConfirm={close}
  onClose={close}
>
  <h1 class="text-center underline underline-offset-8">{title}</h1>

  <div class="mb-5">
    <slot />
  </div>
</Dialog>
