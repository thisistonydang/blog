<script lang="ts">
  import { onMount } from "svelte";

  import EasterEgg from "./EasterEgg.svelte";
  import SubscriptionForm from "./SubscriptionForm.svelte";

  let date = new Date().getFullYear();

  onMount((): number => (date = new Date().getFullYear()));
</script>

<footer class="mt-24">
  <SubscriptionForm />
  <div class="mt-20 flex items-center">
    <EasterEgg />
    <p class="ml-2 text-xs opacity-90">
      &copy; {date} Tony Dang<br />
      Built with
      <a href="https://astro.build">Astro</a>,
      <a href="https://svelte.dev">Svelte</a>,
      <a href="https://tailwindcss.com">Tailwind</a>
      &amp; <span role="img" aria-label="coffee">🧋</span>
    </p>
  </div>
</footer>
