<script lang="ts">
  import InterfaceDialog from "./InterfaceDialog.svelte";
  import StatsList from "./StatsList.svelte";
</script>

<InterfaceDialog title="Stats">
  <StatsList />

  <p class="xxs:text-base max-w-xs text-center text-sm">
    Please note, these counts will reset if you clear your browser history.
  </p>
</InterfaceDialog>
