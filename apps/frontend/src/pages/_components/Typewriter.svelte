<script lang="ts">
  import { onMount } from "svelte";

  export let strings: string[];
  let string_visible = true;
  let index = 0;
  $: str = strings[index];

  function typewriter(node: HTMLSpanElement, { speed = 1 }) {
    const valid =
      node.childNodes.length === 1 &&
      node.childNodes[0]?.nodeType === Node.TEXT_NODE;

    if (!valid) {
      throw new Error(
        "This transition only works on elements with a single text node child"
      );
    }

    const text = node.textContent ?? "";

    const duration = text.length / (speed * 0.01);

    return {
      duration,
      tick: (t: number): void => {
        const i = Math.trunc(text.length * t);
        node.textContent = text.slice(0, i);
      },
    };
  }

  function type(): void {
    string_visible = true;
    setTimeout(() => {
      string_visible = false;
      setTimeout(() => {
        index = index < strings.length - 1 ? index + 1 : 0;
        type();
      }, 2000);
    }, 2000);
  }

  onMount(() => {
    type();
  });
</script>

<div
  class="
    after:bg-accent relative inline-block text-xl
    after:absolute after:-right-[6px] after:h-8 after:w-1
    after:motion-safe:animate-[pulse_1s_steps(1,start)_infinite]
  "
>
  <span class="font-bold">&gt; &nbsp;</span>
  {#if string_visible}
    <span transition:typewriter={{ speed: 2 }}>
      {str}
    </span>
  {/if}
</div>
