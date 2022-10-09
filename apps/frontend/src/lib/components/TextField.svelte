<script lang="ts">
  export let label: string;
  export let label_is_visible = true;
  export let type: "email" | "number" | "text" | "search" = "text";
  export let maxlength: number | undefined = undefined;
  export let min: number | undefined = undefined;
  export let max: number | undefined = undefined;
  export let step: number | undefined = undefined;
  export let name: string | undefined = undefined;
  export let value: string | number = "";
  export let autocomplete = "off";
  export let required = false;
  export let max_width = "219px";
  export let width = "45vw";
  export let invalid = false;
  export let text_center = false;
  export let text_3xl = false;
  export let onchange: (() => void) | undefined = undefined;
  export let helper_text = "";

  $: if (!maxlength && type !== "number") {
    maxlength = type === "email" ? 256 : 50;
  }

  function update_value(e: Event): void {
    const target = e.target as HTMLInputElement;
    value = type === "number" ? +target.value : target.value;
  }
</script>

<label>
  <p
    class="m-0 text-sm"
    class:text-error={invalid}
    class:invisible={!label_is_visible}
  >
    {label}
  </p>

  <input
    {type}
    {maxlength}
    {min}
    {max}
    {step}
    {name}
    {value}
    {autocomplete}
    {required}
    style:max-width={max_width}
    style:width
    class="
      border-text
      hover:border-accent hover:bg-surface focus:border-accent
      focus:bg-surface border-0
      border-b bg-transparent focus:ring-0
    "
    class:border-error={invalid}
    class:hover:border-error={invalid}
    class:focus:border-error={invalid}
    class:text-center={text_center}
    class:text-3xl={text_3xl}
    on:input={update_value}
    on:change={onchange}
  />

  {#if helper_text}
    <p class="text-error animate-shake absolute m-0 text-sm">
      {helper_text}
    </p>
  {/if}
</label>
