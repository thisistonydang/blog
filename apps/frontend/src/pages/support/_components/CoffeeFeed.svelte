<script lang="ts">
  import { fly } from "svelte/transition";

  interface Donation {
    display_name: string;
    amount: number;
  }

  let donations: Donation[] = [];
  $: totalCoffees = donations?.reduce(
    (sum: number, donation: Donation): number => sum + donation.amount / 500,
    0
  );

  const get_donations = async (): Promise<void> => {
    const PUBLIC_BACKEND_URL = import.meta.env.PUBLIC_BACKEND_URL;
    const res = await fetch(`${PUBLIC_BACKEND_URL}/support/donations`);
    if (res.status === 200) {
      const data = await res.json();
      donations = data.donations;
    }
  };
</script>

{#await get_donations() then _}
  {#if donations.length}
    <p>Thank you for all your support!</p>

    <p>
      <b>{totalCoffees}</b> &times;
      <span role="img" aria-label="coffee">☕</span> received from...
    </p>
    <ul>
      {#each donations as donation, index}
        <li in:fly={{ x: 100, delay: 100 * index }}>
          <b>{donation.display_name}</b> bought {donation.amount / 500}
          &times; <span role="img" aria-label="coffee">☕</span>
        </li>
      {/each}
    </ul>
  {/if}
{:catch}
  {""}
{/await}
