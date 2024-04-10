<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { Writable } from 'svelte/store';

  export let value: any;
  export let label: string | null = null;
  export let helperText: string | null = null;
  export let name: string;
  export let formErrors: Writable<Record<string, string>> | undefined = undefined;

  let classList = '';
  export { classList as class };

  const dispatchEvent = createEventDispatcher();

  const handleOnFocus = () => {
    if ($formErrors?.hasOwnProperty(name)) {
      delete $formErrors[name];
    }
  };

  const handleBlur = () => {
    dispatchEvent('blur', value);
  };

  const handleChange = () => {
    dispatchEvent('change', value);
  };
</script>

<div class="flex w-full flex-col gap-2">
  {#if label}
    <label for={name} class="text-sm font-medium text-text">{label}</label>
  {/if}

  <input
    type="text"
    {name}
    {...$$restProps}
    on:focus={handleOnFocus}
    on:change={handleChange}
    on:blur={handleBlur}
    class={`rounded-lg border border-gray-300 focus:outline-brand px-4 py-2  ${classList}`}
    class:border-red-500={$formErrors && $formErrors[name]}
    bind:value
  />{#if helperText}
    <span class="mt-0.5 text-xs text-gray-400">{helperText}</span>
  {/if}
  {#if $formErrors && $formErrors[name]}
    <span class="block pt-1 text-right text-sm text-red-500">{$formErrors[name]}</span>
  {/if}
</div>
