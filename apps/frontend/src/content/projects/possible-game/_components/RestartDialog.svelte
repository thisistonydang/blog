<script lang="ts">
  import Dialog from "@lib/components/Dialog.svelte";
  import { isFullscreen } from "../_stores/appState";
  import type { App } from "../_world/App";

  export let title: string;
  export let app: App;

  function restart(e: Event) {
    e.preventDefault();
    app.restart();
  }

  function exitFullscreen(e: Event) {
    e.preventDefault();
    document.exitFullscreen();
  }
</script>

<Dialog
  isModal={$isFullscreen}
  isProse
  hasPadding
  buttonWidth={175}
  confirmText="RESTART"
  cancelText={$isFullscreen ? "EXIT FULLSCREEN" : undefined}
  onConfirm={restart}
  onCancel={exitFullscreen}
  onClose={restart}
>
  <h1 class="mb-8 text-center">{title}</h1>
</Dialog>
