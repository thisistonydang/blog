<script lang="ts">
  import { onlineCount, onlinePlayers } from "../_stores/competitiveState";
</script>

<div class="group fixed right-5 top-20 z-40">
  <div
    class="rounded-full border border-[#14532d] bg-[#16a34a]/90 px-3 py-1 text-sm text-white backdrop-blur-sm"
  >
    <span class="mr-1 inline-block h-2 w-2 rounded-full bg-white"></span>
    <span aria-live="polite">{$onlineCount} online</span>
  </div>

  <div
    class="bg-surface/95 border-text text-text invisible absolute right-0 mt-2 min-w-[180px] translate-y-1 rounded border p-3 text-sm opacity-0 shadow-lg backdrop-blur-sm transition duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100"
  >
    <p class="text-heading mb-2 font-semibold">Online players</p>

    {#if $onlinePlayers.length}
      <ul class="m-0 max-h-52 list-none space-y-1 overflow-y-auto p-0">
        {#each $onlinePlayers as player (player.userId)}
          <li class="flex items-center gap-2 whitespace-nowrap">
            <span
              class="inline-block h-2 w-2 shrink-0 rounded-full bg-[#16a34a]"
            ></span>
            {player.displayName}
          </li>
        {/each}
      </ul>
    {:else}
      <p class="m-0">No players online.</p>
    {/if}
  </div>
</div>
