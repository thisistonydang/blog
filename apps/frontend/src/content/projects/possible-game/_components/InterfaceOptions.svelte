<script lang="ts">
  import Dialog from "@lib/components/Dialog.svelte";
  import IconButton from "@lib/components/IconButton.svelte";
  import InterfaceList from "@lib/components/InterfaceList.svelte";
  import { requestFullscreen } from "@lib/fullscreen/requestFullscreen";
  import { app, interfaceState, isMuted } from "../_stores/appState";

  let showFullscreenError = false;

  function dismissError(e: Event) {
    e.preventDefault();
    showFullscreenError = false;
  }
</script>

<InterfaceList isVertical shiftUp>
  <li class="flex flex-wrap gap-2">
    <IconButton
      isPill
      onClick={() => {
        const container = $app?.renderer.domElement.parentElement;

        if (container) {
          const success = requestFullscreen(container);

          if (!success) {
            showFullscreenError = true;
          }
        }
      }}
    >
      Enter Fullscreen
    </IconButton>

    <IconButton isPill fixedWidth={100} onClick={() => ($isMuted = !$isMuted)}>
      Sound {$isMuted ? "Off" : "On"}
    </IconButton>
  </li>

  <li class="flex flex-wrap gap-2">
    <IconButton isPill onClick={() => ($interfaceState = "credits")}>
      Credits
    </IconButton>

    <IconButton isPill onClick={() => ($interfaceState = "how_to_play")}>
      How To Play
    </IconButton>

    <IconButton isPill onClick={() => ($interfaceState = "stats")}>
      Stats
    </IconButton>
  </li>
</InterfaceList>

{#if showFullscreenError}
  <Dialog
    isModal
    isProse
    hasPadding
    buttonWidth={100}
    confirmText="CLOSE"
    onConfirm={dismissError}
    onClose={dismissError}
  >
    <h1 class="text-center">Whoops!</h1>

    <p class="mb-5">Fullscreen is not supported on this browser.</p>
  </Dialog>
{/if}
