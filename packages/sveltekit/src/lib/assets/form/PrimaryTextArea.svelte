<script lang="ts">
  import type { Writable } from 'svelte/store';
  export let value: any;
  export let label: string | null = null;
  export let helperText: string | null = null;
  export let name: string;
  export let formErrors: Writable<Record<string, string>> | undefined = undefined;
  const handleOnFocus = () => {
    if ($formErrors?.hasOwnProperty(name)) {
      delete $formErrors[name];
    }
  };
</script>

<div class="flex w-full flex-col gap-2">
  {#if label}
    <label for={name} class="text-sm font-medium text-text">{label}</label>
  {/if}
  <div class="relative w-full">
    <textarea
      bind:value
      {name}
      {...$$restProps}
      on:focus={handleOnFocus}
      on:change
      on:blur
      data-private
      class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-brand disabled:bg-slate-50"
      class:border-red-500={$formErrors && $formErrors[name]}
    />
  </div>
  {#if helperText}
    <span class="mt-0.5 text-xs text-gray-400">{helperText}</span>
  {/if}
  {#if $formErrors && $formErrors[name]}
    <span class="block pt-1 text-right text-sm text-red-500">{$formErrors[name]}</span>
  {/if}
</div>
