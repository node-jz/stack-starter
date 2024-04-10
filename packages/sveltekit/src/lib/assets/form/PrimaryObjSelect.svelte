<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { Writable } from 'svelte/store';

  // The items to display in the select dropdown.
  export let allItems: Record<string, any>[];

  // A writable store for the selected item's ID.
  export let value: Record<string, any> | null;
  export let labelKey: string = 'label';
  export let idKey: string = 'id';

  export let label: string | null = null;
  export let helperText: string | null = null;
  export let name: string;
  export let formErrors: Writable<Record<string, string>> | undefined = undefined;

  // Temporary selected id for binding with the select element
  let selectedId = value ? value[idKey] : '';

  // Update the `value` whenever `selectedId` changes
  $: if (selectedId) {
    value = allItems.find((item) => item[idKey] == selectedId) || null;
  }
</script>

<div class="flex w-full flex-col gap-2">
  {#if label}
    <label for={name} class="text-sm font-medium text-text">{label}</label>
  {/if}
  <select
    class={`rounded-lg cursor-pointer border border-gray-300 focus:outline-brand px-4 py-2 w-full`}
    class:border-red-500={$formErrors && $formErrors[name]}
    bind:value={selectedId}
  >
    <option value="" disabled>Select an option</option>
    {#each allItems as item}
      <option value={item[idKey]} selected={value && value[idKey] == item[idKey]}>
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
