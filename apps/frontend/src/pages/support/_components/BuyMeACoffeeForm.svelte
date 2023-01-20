<script lang="ts">
  import Button from "@lib/components/Button.svelte";
  import TextField from "@lib/components/TextField.svelte";

  const PUBLIC_BACKEND_URL = import.meta.env.PUBLIC_BACKEND_URL;
  const MAX = 1000;
  let qty = 1;

  function remove_qty(): void {
    qty = qty > 1 ? qty - 1 : 1;
  }

  function change_qty(): void {
    if (isNaN(qty) || qty < 1) qty = 1;
    else if (qty > MAX) qty = MAX;
  }

  function add_qty(): void {
    qty = qty < MAX ? qty + 1 : MAX;
  }
</script>

<form
  class="text-center"
  method="POST"
  action={`${PUBLIC_BACKEND_URL}/support/create-stripe-checkout`}
>
  <div class="m-auto mb-5 flex w-max items-center">
    <button
      class="
        active:bg-surface mt-5 p-2 text-4xl
        transition-transform duration-200 hover:scale-125
      "
      on:click|preventDefault={remove_qty}
    >
      &minus;
    </button>

    <TextField
      label="Donation quantity"
      label_is_visible={false}
      type="number"
      min={1}
      max={MAX}
      step={1}
      name="qty"
      bind:value={qty}
      required
      width="125px"
      text_center
      text_3xl
      onchange={change_qty}
    />

    <button
      class="
        active:bg-surface mt-5 p-2 text-4xl
        transition-transform duration-200 hover:scale-125
      "
      on:click|preventDefault={add_qty}
    >
      &plus;
    </button>

    <span class="mt-5 p-2 text-4xl">
      &nbsp; &times; <span role="img" aria-label="coffee">☕</span>
    </span>
  </div>

  <Button width="150px">SUPPORT ${qty * 5}</Button>
</form>
