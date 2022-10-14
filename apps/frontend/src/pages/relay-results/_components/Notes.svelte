<script lang="ts">
  import { onMount } from "svelte";

  import { get_error_message } from "@tonydangblog/error-handling";

  export let date: string;

  let mounted = false;
  let notes: string[] = [];

  async function get_notes(date: string): Promise<void> {
    try {
      const res = await fetch(`/relay-results/${date}-notes.json`);
      notes = await res.json();
    } catch (error: unknown) {
      console.log(get_error_message(error));
    }
  }

  onMount(() => (mounted = true));
  $: if (mounted) get_notes(date);
</script>

{#if notes?.length}
  <h2>Notes</h2>
  <ul>
    {#each notes as note}
      <li>{note}</li>
    {/each}
  </ul>
{/if}
