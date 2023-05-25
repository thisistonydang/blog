<script lang="ts">
  import { onMount } from "svelte";

  import { interfaceState } from "../_stores/appState";
  import Credits from "./Credits.svelte";
  import HowToPlay from "./HowToPlay.svelte";
  import InterfaceOptions from "./InterfaceOptions.svelte";
  import InterfaceTitle from "./InterfaceTitle.svelte";

  onMount(() => ($interfaceState = "opened"));
</script>

<nav>
  {#if ["closed", "opened"].includes($interfaceState)}
    <InterfaceTitle />
  {/if}

  {#if $interfaceState === "opened"}
    <InterfaceOptions />
  {:else if $interfaceState === "credits"}
    <Credits />
  {:else if $interfaceState === "how_to_play"}
    <HowToPlay />
  {/if}
</nav>
