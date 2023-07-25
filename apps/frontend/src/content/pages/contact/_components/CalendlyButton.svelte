<script lang="ts">
  import Button from "@lib/components/Button.svelte";

  function showCalendlyWidget() {
    // @ts-expect-error Global Calendly object from injected head script.
    Calendly.showPopupWidget("https://calendly.com/tonydang/lets-chat");
  }
</script>

<svelte:head>
  <script
    src="https://assets.calendly.com/assets/external/widget.js"
    defer
  ></script>
  <link
    href="https://assets.calendly.com/assets/external/widget.css"
    rel="stylesheet"
  />
</svelte:head>

<Button width={120} onClick={showCalendlyWidget}>BOOK A CALL</Button>
