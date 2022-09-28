<script lang="ts">
  export let path: string;

  const handleClick = (): void => {
    document.documentElement.classList.add("scroll-smooth");
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    setTimeout((): void => {
      document.documentElement.classList.remove("scroll-smooth");
    }, 500);
  };
</script>

<a class="no-underline" href={path} on:click|preventDefault={handleClick}>
  &uarr; Scroll to top
</a>
