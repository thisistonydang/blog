<script lang="ts">
  import TextField from "@lib/components/TextField.svelte";
  import Whoops from "@lib/components/Whoops.svelte";
  import type { BlogPostFrontmatter } from "@lib/types/frontmatter";

  export let posts: BlogPostFrontmatter[];

  let search_string = "";
  let filteredPosts = posts;

  $: words = search_string.trim().replace(/\s+/g, " ").split(" ");

  $: if (words.length) {
    filteredPosts = posts.filter((post: BlogPostFrontmatter): boolean => {
      let match = false;
      words.forEach((word): void => {
        if (
          post.title.match(new RegExp(word, "i")) ||
          post.description.match(new RegExp(word, "i"))
        ) {
          match = true;
        }
      });
      return match;
    });
  } else {
    filteredPosts = posts;
  }
</script>

<TextField label="Search" type="search" bind:value={search_string} />

<ul class="list-none p-0">
  {#each filteredPosts as post (post.path)}
    <li>
      <time class="text-xs" datetime={post.pubDate}>
        {post.pubDate.substring(0, 10)}
      </time>
      <br />
      <a class="text-lg" href={post.path}>{post.title}</a>
      <p class="mt-0">{post.description}</p>
    </li>
  {:else}
    <Whoops message="Can't find any posts..." />
  {/each}
</ul>
