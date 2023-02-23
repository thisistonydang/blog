<script lang="ts">
  export let message = "";
</script>

<div class="text-center">
  <div class="my-20 text-8xl">(◑_◑)</div>
  {#if message}
    <p class="text-lg">{message}</p>
  {/if}
</div>
