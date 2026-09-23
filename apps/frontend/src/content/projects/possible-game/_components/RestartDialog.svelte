<script lang="ts">
  import Dialog from "@lib/components/Dialog.svelte";
  import { exitFullscreen } from "@lib/fullscreen/exitFullscreen";
  import { app, isFullscreen } from "../_stores/appState";
  import { resultSubmitting } from "../_stores/competitiveState";
  import StatsLeaderboard from "./StatsLeaderboard.svelte";

  export let title: string;

  function restart(e: Event) {
    e.preventDefault();
    if ($resultSubmitting) return;
    $app?.restart();
  }
</script>

<Dialog
  isModal={$isFullscreen}
  isProse
  hasPadding
  buttonWidth={175}
  confirmText="RESTART"
  confirmLoading={$resultSubmitting}
  cancelText={$isFullscreen ? "EXIT FULLSCREEN" : undefined}
  preventCancel={$resultSubmitting}
  onConfirm={restart}
  onCancel={exitFullscreen}
  onClose={restart}
>
  <div class="mx-8 mb-5">
    <h1 class="mb-1 text-center">{title}</h1>
    <StatsLeaderboard />
  </div>
</Dialog>
