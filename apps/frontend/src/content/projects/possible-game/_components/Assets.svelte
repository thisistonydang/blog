<script lang="ts">
  import GameOverAudio from "./GameOverAudio.svelte";
  import LevelAudio from "./LevelAudio.svelte";
  import PlayerImage from "./PlayerImage.svelte";
  import ScoreAudio from "./ScoreAudio.svelte";
  import TrapImage from "./TrapImage.svelte";

  export let assetsVersion: number;
</script>

<!-- Audio -->
<ScoreAudio {assetsVersion} />
<GameOverAudio {assetsVersion} />
<LevelAudio {assetsVersion} />

<!-- Textures -->
<PlayerImage {assetsVersion} />
<TrapImage {assetsVersion} />
