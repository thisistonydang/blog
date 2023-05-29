<script lang="ts">
  import { onMount } from "svelte";

  import { interfaceState, visited } from "../_stores/appState";

  import Credits from "./Credits.svelte";
  import HowToPlay from "./HowToPlay.svelte";
  import InterfaceOptions from "./InterfaceOptions.svelte";
  import InterfaceTitle from "./InterfaceTitle.svelte";
  import Stats from "./Stats.svelte";
  import Welcome from "./Welcome.svelte";

  onMount(() => {
    // Show welcome information if user has not visited before, else show the
    // interface options.
    $interfaceState = $visited ? "opened" : "welcome";
  });
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
  {:else if $interfaceState === "stats"}
    <Stats />
  {:else if $interfaceState === "welcome"}
    <Welcome />
  {/if}
</nav>
