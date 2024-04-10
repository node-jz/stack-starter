<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import type { Writable } from 'svelte/store';

  export let allItems: Record<string, any>[];
  export let value: string | null;
  export let label: string | null = null;
  export let idKey: string;
  export let labelKey: string;
  export let helperText: string | null = null;
  export let name: string;
  export let formErrors: Writable<Record<string, string>> | undefined = undefined;
</script>

<div class="flex w-full flex-col gap-2">
  {#if label}
    <label for={name} class="text-sm font-medium text-text">{label}</label>
  {/if}
  <select
    class={`rounded-lg cursor-pointer border border-gray-300 focus:outline-brand px-4 py-2 w-full`}
    class:border-red-500={$formErrors && $formErrors[name]}
    bind:value
    {name}
    {...$$restProps}
  >
    <option value="" disabled>Select an option</option>
    {#each allItems as item}
      <option value={item[idKey]}>
        {item[labelKey]}
      </option>
    {/each}
  </select>
  {#if helperText}
    <span class="mt-0.5 text-xs text-gray-400">{helperText}</span>
  {/if}
  {#if $formErrors && $formErrors[name]}
    <span class="block pt-1 text-right text-sm text-red-500">{$formErrors[name]}</span>
  {/if}
</div>
