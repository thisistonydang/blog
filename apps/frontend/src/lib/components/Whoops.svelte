<script lang="ts">
  export let message = "";
</script>

<div class="text-center">
  <div class="text-8xl my-20">(◑_◑)</div>
  {#if message}
    <p class="text-lg">{message}</p>
  {/if}
</div>
