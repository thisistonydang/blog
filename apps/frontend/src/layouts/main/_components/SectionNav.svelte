<script lang="ts">
  import { onMount } from "svelte";
  import SectionLink from "./SectionLink.svelte";

  let current_section: "root" | "about" | "contact";
  let root_h1: HTMLHeadingElement | null;
  let about_h2: HTMLHeadingElement | null;
  let contact_h2: HTMLHeadingElement | null;

  /**
   * Determine whether an element is currently in the viewport.
   */
  function is_in_viewport(element: HTMLElement | null): boolean {
    if (!element) return false;

    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  /**
   * Determine which section of page the user is on.
   */
  function determine_section(): void {
    if (is_in_viewport(root_h1)) current_section = "root";
    else if (window.innerHeight + window.scrollY >= document.body.offsetHeight)
      current_section = "contact";
    else if (is_in_viewport(about_h2)) current_section = "about";
    else if (is_in_viewport(contact_h2)) current_section = "contact";
  }

  onMount(() => {
    root_h1 = document.querySelector("h1");
    about_h2 = document.querySelector("#about h2");
    contact_h2 = document.querySelector("#contact h2");

    determine_section();
  });
</script>

<svelte:window on:scroll={determine_section} />

<!-- z-index required to ensure element is clickable on mobile. -->
<nav class="xxs:block fixed right-5 bottom-0 z-50 hidden">
  <ul>
    <SectionLink id="root" {current_section} />
    <SectionLink id="about" {current_section} />
    <SectionLink id="contact" {current_section} />
  </ul>
</nav>
