<script lang="ts">
  import Button from "@lib/components/Button.svelte";
  import Dialog from "@lib/components/Dialog.svelte";

  import {
    initializeCompetitiveAuth,
    signInWithGitHub,
  } from "../_competitive/client";
  import { authStatus, competitiveError } from "../_stores/competitiveState";

  let submitting = false;

  async function signIn(): Promise<void> {
    submitting = true;
    $competitiveError = "";

    try {
      await signInWithGitHub();
    } catch (error) {
      $competitiveError =
        error && typeof error === "object" && "message" in error
          ? String(error.message)
          : "Could not sign in with GitHub.";
      submitting = false;
    }
  }
</script>

<Dialog isModal isProse hasPadding preventCancel>
  <div class="w-[min(360px,75vw)]">
    <h1 class="text-center">Possible Game</h1>

    {#if $authStatus === "error"}
      <p class="text-error text-center">{$competitiveError}</p>
      <div class="flex justify-center">
        <Button onClick={() => void initializeCompetitiveAuth()}>Retry</Button>
      </div>
    {:else}
      <p class="text-center">
        Sign in with GitHub to play and join the leaderboard. Your GitHub
        username will be shown publicly.
      </p>

      {#if $competitiveError}
        <p class="text-error text-center text-sm">{$competitiveError}</p>
      {/if}

      <div class="flex justify-center">
        <Button
          width={210}
          loading={submitting}
          disabled={submitting}
          onClick={() => void signIn()}
        >
          Sign in with GitHub
        </Button>
      </div>
    {/if}
  </div>
</Dialog>
