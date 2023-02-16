<script lang="ts">
  import { fly } from "svelte/transition";
  import { onMount } from "svelte";

  import { get_error_message } from "@tonydangblog/error-handling";

  import Button from "@lib/components/Button.svelte";
  import TextField from "@lib/components/TextField.svelte";

  interface Data {
    name?: string;
    email?: string;
    unsubscribed?: string;
    confirmed?: string;
    success?: string;
    error?: string;
  }

  let name = "";
  let name_is_invalid = false;
  let name_helper_text = "";
  let email = "";
  let email_is_invalid = false;
  let email_helper_text = "";
  let disabled = true;
  let loading = false;
  let message = "";

  function success_handler(data: Data): void {
    if (data.name) {
      name_is_invalid = true;
      name_helper_text = data.name;
    }

    if (data.email) {
      email_is_invalid = true;
      email_helper_text = data.email;
    }

    if (data.unsubscribed) {
      message = data.unsubscribed;
    }

    if (data.confirmed || data.success) {
      name = "";
      email = "";
      message = (data.confirmed ?? data.success) as string;
    }

    if (data.error) {
      message = data.error;
    }
  }

  async function handle_submit(): Promise<void> {
    disabled = true;
    loading = true;
    name_is_invalid = false;
    name_helper_text = "";
    email_is_invalid = false;
    email_helper_text = "";
    message = "";
    try {
      const PUBLIC_BACKEND_URL = import.meta.env.PUBLIC_BACKEND_URL;
      const res = await fetch(`${PUBLIC_BACKEND_URL}/list/subscribe`, {
        method: "POST",
        body: JSON.stringify({ name, email }),
        headers: {
          Accept: "application/json",
        },
      });
      if (res.status === 200) {
        const data = await res.json();
        success_handler(data);
        return;
      }
      throw new Error("Whoops, something went wrong...");
    } catch (error: unknown) {
      message = get_error_message(error);
    } finally {
      disabled = false;
      loading = false;
    }
  }

  onMount(() => {
    disabled = false;
  });
</script>

<form id="subscription-form" on:submit|preventDefault={handle_submit}>
  <p class="text-sm">GET BLOG UPDATES &amp; ANNOUNCEMENTS</p>

  <div class="flex items-end gap-1.5">
    <TextField
      label="name*"
      name="name"
      bind:value={name}
      autocomplete="name"
      required
      {disabled}
      width={"28vw"}
      invalid={name_is_invalid}
      helper_text={name_helper_text}
    />

    <TextField
      label="email*"
      type="email"
      name="email"
      bind:value={email}
      autocomplete="email"
      required
      {disabled}
      width={"28vw"}
      invalid={email_is_invalid}
      helper_text={email_helper_text}
    />

    <Button width="76px" {disabled} {loading}>SUBMIT</Button>
  </div>
</form>

{#if message}
  <p transition:fly={{ y: -20 }} class="bg-surface p-4">{message}</p>
{/if}
