<script lang="ts">
  import Dialog from "@lib/components/Dialog.svelte";
  import { app, isFullscreen } from "../_stores/appState";
  import StatsList from "./StatsList.svelte";

  export let title: string;

  function restart(e: Event) {
    e.preventDefault();
    $app.restart();
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
  <div class="mx-8">
    <h1 class="mb-4 text-center">{title}</h1>
    <StatsList />
  </div>
</Dialog>
