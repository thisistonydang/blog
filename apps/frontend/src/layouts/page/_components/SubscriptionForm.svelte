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

  let status: "unmounted" | "typing" | "submitting" = "unmounted";
  let name = "";
  let name_helper_text = "";
  let email = "";
  let email_helper_text = "";
  let message = "";

  function success_handler(data: Data): void {
    if (data.name) {
      name_helper_text = data.name;
    }

    if (data.email) {
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
    status = "submitting";
    name_helper_text = "";
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
      status = "typing";
    }
  }

  onMount(() => {
    status = "typing";
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
      disabled={status !== "typing"}
      width={"33vw"}
      invalid={name_helper_text !== ""}
      helper_text={name_helper_text}
    />

    <TextField
      label="email*"
      type="email"
      name="email"
      bind:value={email}
      autocomplete="email"
      required
      disabled={status !== "typing"}
      width={"33vw"}
      invalid={email_helper_text !== ""}
      helper_text={email_helper_text}
    />

    <Button
      width="76px"
      disabled={status !== "typing"}
      loading={status === "submitting"}
    >
      SUBMIT
    </Button>
  </div>
</form>

{#if message}
  <div
    class="bg-surface my-3 flex w-fit items-center gap-5 rounded p-4"
    in:fly={{ y: -20 }}
  >
    <p class="m-0">{message}</p>
    <button
      aria-label="Dismiss."
      class="cursor-pointer text-2xl"
      on:click={() => (message = "")}
    >
      &times
    </button>
  </div>
{/if}
