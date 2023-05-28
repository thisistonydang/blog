<script lang="ts">
  export let name: string;
  export let count: number;
</script>

<div class="flex justify-between gap-3">
  <dt class="font-bold">{name}</dt>
  <dd>{count}</dd>
</div>
