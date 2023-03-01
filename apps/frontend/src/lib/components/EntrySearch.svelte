<script lang="ts">
  import type { CollectionEntry } from "astro:content";
  import { onMount } from "svelte";
  import TextField from "@lib/components/TextField.svelte";
  import Whoops from "@lib/components/Whoops.svelte";

  export let entries: CollectionEntry<"posts">[];

  let mounted = false;
  let search_string = "";
  let filteredPosts = entries;

  $: words = search_string.trim().replace(/\s+/g, " ").split(" ");

  $: if (words.length) {
    filteredPosts = entries.filter((entry): boolean => {
      let match = false;

      for (let word of words) {
        if (
          entry.data.title.match(new RegExp(word, "i")) ||
          entry.data.description.match(new RegExp(word, "i"))
        ) {
          match = true;
        }
      }

      return match;
    });
  } else {
    filteredPosts = entries;
  }

  function format_date(date: Date): string {
    return new Intl.DateTimeFormat(undefined, {
      dateStyle: "medium",
    }).format(date);
  }

  onMount(() => {
    mounted = true;
  });
</script>

<TextField
  label="Search"
  type="search"
  disabled={!mounted}
  bind:value={search_string}
/>

<div class="not-prose my-8">
  {#if filteredPosts.length}
    <ul class="flex flex-wrap justify-between gap-y-5">
      {#each filteredPosts as entry (entry.slug)}
        <li
          class="
            bg-surface/30 border-surface xs:w-[49%] hover:border-heading
            rounded border
          "
        >
          <a href={`/${entry.slug}/`} rel="prefetch">
            <div class="aspect-[1200/630]">
              <img
                src={entry.data.image
                  ? `/og/dist/960/${entry.slug}.jpg`
                  : "/og/dist/960/tony-dang.jpg"}
                alt={entry.data.image ? entry.data.alt : "Photo of Tony Dang"}
                loading="lazy"
                class="rounded-t"
              />
            </div>
            <div class="p-3">
              <time
                class="text-xs"
                datetime={entry.data.pubDate.toISOString().split("T")[0]}
              >
                {format_date(entry.data.pubDate)}
              </time>
              <br />
              <h2 class="text-heading mb-2 text-xl">{entry.data.title}</h2>
              <p class="text-sm">{entry.data.description}</p>
            </div>
          </a>
        </li>
      {/each}
    </ul>
  {:else}
    <Whoops message="No matches..." />
  {/if}
</div>
