<script lang="ts">
  import Dialog from "@lib/components/Dialog.svelte";
  import IconButton from "@lib/components/IconButton.svelte";
  import InterfaceList from "@lib/components/InterfaceList.svelte";
  import { requestFullscreen } from "@lib/fullscreen/requestFullscreen";
  import { signOut } from "../_competitive/client";
  import {
    app,
    interfaceState,
    isMuted,
    soundToggled,
  } from "../_stores/appState";
  import { addGameToast } from "../_stores/competitiveState";

  let showFullscreenError = false;
  let signingOut = false;

  async function handleSignOut(): Promise<void> {
    if (signingOut) return;
    signingOut = true;

    try {
      await signOut();
    } catch {
      addGameToast("Could not sign out. Please try again.");
    } finally {
      signingOut = false;
    }
  }

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

    <IconButton
      hasPing={!$soundToggled}
      isPill
      fixedWidth={100}
      onClick={() => {
        $isMuted = !$isMuted;
        $soundToggled = true;
      }}
    >
      Sound {$isMuted ? "Off" : "On"}
    </IconButton>

    <IconButton
      isPill
      fixedWidth={90}
      loading={signingOut}
      onClick={() => void handleSignOut()}
    >
      Sign Out
    </IconButton>
  </li>

  <li class="flex flex-wrap gap-2">
    <IconButton isPill onClick={() => ($interfaceState = "credits")}>
      Credits
    </IconButton>

    <IconButton isPill onClick={() => ($interfaceState = "how_to_play")}>
      How To Play
    </IconButton>

    <IconButton isPill onClick={() => ($interfaceState = "leaderboard")}>
      Leaderboard
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
