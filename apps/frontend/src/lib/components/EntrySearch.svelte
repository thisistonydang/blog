<script lang="ts">
  import type { CollectionEntry } from "astro:content";
  import { onMount } from "svelte";

  import EntryImage from "@lib/components/EntryImage.svelte";
  import TextField from "@lib/components/TextField.svelte";
  import Whoops from "@lib/components/Whoops.svelte";

  type Entry = CollectionEntry<"posts"> | CollectionEntry<"projects">;

  export let assetsVersion: number;
  export let entries: Entry[];

  let mounted = false;
  let searchString = "";
  let filteredPosts = entries;

  $: words = searchString.toLowerCase().trim().replace(/\s+/g, " ").split(" ");

  $: if (words.length) {
    filteredPosts = entries.filter((entry): boolean => {
      let match = false;

      for (let word of words) {
        if (
          entry.data.title.toLowerCase().includes(word) ||
          entry.data.description.toLowerCase().includes(word)
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
  bind:value={searchString}
/>

<div class="not-prose my-8">
  {#if filteredPosts.length}
    <ul class="flex flex-wrap justify-between gap-y-5">
      {#each filteredPosts as entry (entry.slug)}
        <li
          class="
            bg-surface/30 border-surface xs:w-[49%] hover:border-heading
            rounded-sm border
          "
        >
          <a href="/{entry.slug}/" rel="prefetch">
            <EntryImage {entry} {assetsVersion} />

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
