<script lang="ts">
  import { onMount } from "svelte";

  import {
    closeRealtime,
    initializeCompetitiveAuth,
  } from "../_competitive/client";

  onMount(() => {
    void initializeCompetitiveAuth();
    return closeRealtime;
  });
</script>
