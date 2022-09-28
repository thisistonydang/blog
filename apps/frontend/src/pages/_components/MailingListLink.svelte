<script lang="ts">
  const handle_click = (): void => {
    const form = document.querySelector("#subscription-form");
    document.documentElement.classList.add("scroll-smooth");
    form?.scrollIntoView();
    form?.classList.add("animate-shake");
    setTimeout((): void => {
      document.documentElement.classList.remove("scroll-smooth");
      form?.classList.remove("animate-shake");
    }, 800);
  };
</script>

<p>
  Want to be notified when I have blog updates and announcements? Sign up to my
  <a on:click|preventDefault={handle_click} href="#subscription-form">
    mailing list
  </a>
  below!👇
</p>
