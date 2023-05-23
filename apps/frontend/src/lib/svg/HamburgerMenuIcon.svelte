<script lang="ts">
  import SvgIcon from "./SvgIcon.svelte";

  export let width: number | undefined = undefined;
  export let height: number | undefined = undefined;
</script>

<SvgIcon {width} {height}>
  <path
    d="m128 168c0-8.8359 7.1641-16 16-16h224c8.8359 0 16 7.1641 16 16s-7.1641 16-16 16h-224c-8.8359 0-16-7.1641-16-16z"
  />
  <path
    d="m128 256c0-8.8359 7.1641-16 16-16h224c8.8359 0 16 7.1641 16 16s-7.1641 16-16 16h-224c-8.8359 0-16-7.1641-16-16z"
  />
  <path
    d="m144 328c-8.8359 0-16 7.1641-16 16s7.1641 16 16 16h224c8.8359 0 16-7.1641 16-16s-7.1641-16-16-16z"
  />
</SvgIcon>
