<script lang="ts">
  import Dialog from "@lib/components/Dialog.svelte";
  import { interfaceState } from "../_stores/appState";

  function close(e: Event) {
    e.preventDefault();
    $interfaceState = "opened";
  }
</script>

<Dialog
  isModal
  isProse
  hasPadding
  buttonWidth={100}
  confirmText="CLOSE"
  onConfirm={close}
  onClose={close}
>
  <slot />
</Dialog>
