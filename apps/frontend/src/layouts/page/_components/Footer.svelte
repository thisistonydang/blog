<script lang="ts">
  import { onMount } from "svelte";

  import EasterEgg from "./EasterEgg.svelte";
  import SubscriptionForm from "./SubscriptionForm.svelte";

  let year = new Date().getFullYear().toString();

  onMount(() => {
    year = new Date().getFullYear().toString();
  });
</script>

<footer class="xxs:mr-14 mt-24">
  <SubscriptionForm />
  <div class="mt-20 flex items-center">
    <EasterEgg />
    <p class="prose-a:no-underline ml-2 text-xs leading-relaxed opacity-90">
      &copy; <time id="footer-copyright-year" datetime={year}>{year}</time>
      Tony Dang |
      <a href="/rss.xml"><abbr title="Really Simple Syndication">RSS</abbr></a>
      <br />
      Built w/
      <a href="https://astro.build">Astro</a>,
      <a href="https://svelte.dev/">Svelte</a>, &amp;
      <a href="https://workers.cloudflare.com">Cloudflare Workers</a>
    </p>
  </div>
</footer>
