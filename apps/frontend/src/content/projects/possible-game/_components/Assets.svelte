<script lang="ts">
  import GameOverAudio from "./GameOverAudio.svelte";
  import LevelAudio from "./LevelAudio.svelte";
  import PlayerImage from "./PlayerImage.svelte";
  import ScoreAudio from "./ScoreAudio.svelte";
  import TrapImage from "./TrapImage.svelte";
</script>

<!-- Audio -->
<ScoreAudio />
<GameOverAudio />
<LevelAudio />

<!-- Textures -->
<PlayerImage />
<TrapImage />
