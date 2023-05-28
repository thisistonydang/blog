<script lang="ts">
  import HowToPlayInstructions from "./HowToPlayInstructions.svelte";
  import InterfaceDialog from "./InterfaceDialog.svelte";
</script>

<InterfaceDialog title="Possible Game">
  <div class="max-w-md">
    <p class="xxs:text-base text-sm">
      Welcome to the Possible Game, a 2D platformer inspired by
      <a href="https://impossible.game/1/">The Impossible Game</a>.
    </p>

    <h2 class="text-center">How To Play</h2>
    <HowToPlayInstructions />
  </div>
</InterfaceDialog>
