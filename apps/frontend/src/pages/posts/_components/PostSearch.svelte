<script lang="ts">
  import TextField from "@lib/components/TextField.svelte";
  import Whoops from "@lib/components/Whoops.svelte";
  import type { CollectionEntry } from "astro:content";

  export let posts: CollectionEntry<"posts">[];

  let search_string = "";
  let filteredPosts = posts;

  $: words = search_string.trim().replace(/\s+/g, " ").split(" ");

  $: if (words.length) {
    filteredPosts = posts.filter((post): boolean => {
      let match = false;
      words.forEach((word): void => {
        if (
          post.data.title.match(new RegExp(word, "i")) ||
          post.data.description.match(new RegExp(word, "i"))
        ) {
          match = true;
        }
      });
      return match;
    });
  } else {
    filteredPosts = posts;
  }

  function format_date(date: Date): string {
    return new Intl.DateTimeFormat(undefined, {
      dateStyle: "medium",
    }).format(date);
  }
</script>

<TextField label="Search" type="search" bind:value={search_string} />

<ul class="list-none p-0">
  {#each filteredPosts as post (post.data.path)}
    <li>
      <time
        class="text-xs"
        datetime={post.data.pubDate.toISOString().split("T")[0]}
      >
        {format_date(post.data.pubDate)}
      </time>
      <br />
      <a class="text-lg" href={post.data.path} rel="prefetch">
        {post.data.title}
      </a>
      <p class="mt-0">{post.data.description}</p>
    </li>
  {:else}
    <Whoops message="Can't find any posts..." />
  {/each}
</ul>
