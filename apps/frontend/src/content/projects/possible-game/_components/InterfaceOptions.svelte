<script lang="ts">
  import IconButton from "@lib/components/IconButton.svelte";
  import InterfaceList from "@lib/components/InterfaceList.svelte";
  import { interfaceState, isFullscreen, isMuted } from "../_stores/appState";
</script>

<InterfaceList isVertical shiftUp>
  <li class="flex flex-wrap gap-2">
    <IconButton isPill onClick={() => ($isFullscreen = true)}>
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
  </li>
</InterfaceList>
