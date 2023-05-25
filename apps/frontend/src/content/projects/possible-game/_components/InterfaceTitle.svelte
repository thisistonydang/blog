<script lang="ts">
  import IconButton from "@lib/components/IconButton.svelte";
  import Prose from "@lib/components/Prose.svelte";
  import HamburgerMenuIcon from "@lib/svg/HamburgerMenuIcon.svelte";
  import XIcon from "@lib/svg/XIcon.svelte";

  import { interfaceState } from "../_stores/appState";
</script>

<div
  class="
    fixed bottom-8 left-8 flex
    animate-[fade-in_0.25s] animate-[fly-right_0.25s]
    items-center gap-4
  "
>
  <IconButton
    ariaLabel="Show options."
    ariaLabelToggled="Hide options."
    isToggled={$interfaceState === "opened"}
    onClick={() =>
      ($interfaceState = $interfaceState === "closed" ? "opened" : "closed")}
  >
    <HamburgerMenuIcon width={30} height={30} />
    <XIcon slot="toggled-text" width={20} height={20} />
  </IconButton>

  <Prose>
    <h1 class="xxs:text-4xl bg-bg pr-4 text-2xl">Possible Game</h1>
  </Prose>
</div>
