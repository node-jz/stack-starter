<script lang="ts">
  import type { Writable } from 'svelte/store';

  export let label: string | null = null;
  export let helperText: string | null = null;
  export let name: string;
  export let formErrors: Writable<Record<string, string>> | undefined = undefined;
</script>

<div class="w-full flex flex-col gap-0">
  {#if label}
    <label for={name} class="text-xs text-gray-500 uppercase">{label}</label>
  {/if}
  {#if helperText}
    <span class="text-xs text-gray-400 mt-0.5">{helperText}</span>
  {/if}
  <input
    type="date"
    {name}
    {...$$restProps}
    class="rounded-lg border border-gray-300 focus:outline-brand px-4 py-2 disabled:text-gray-400 font-writing"
    class:border-red-500={$formErrors && $formErrors[name]}
    on:change
  />
  {#if $formErrors && $formErrors[name]}
    <span class="text-red-500 text-sm pt-1 text-right block">{$formErrors[name]}</span>
  {/if}
</div>
