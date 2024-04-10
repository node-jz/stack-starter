<script lang="ts">
  import { get, writable, type Writable } from 'svelte/store';
  export let value: Record<string, any>[] = [];
  export let selectedItems: Writable<Record<string, any>[]> = writable([]);
  export let allItems: Record<string, any>[];
  export let label: string | null = null;
  export let helperText: string | null = null;
  export let labelKey: string = 'label';
  export let idKey: string = 'id';
  export let name: string;
  export let formErrors: Writable<Record<string, string>> | undefined = undefined;
  function toggleItem(item: Record<string, any>) {
    selectedItems.update((currentItems) => {
      const index = currentItems.indexOf(item);
      if (index < 0) {
        return [...currentItems, item];
      } else {
        return currentItems.filter((_, i) => i !== index);
      }
    });
  }

  $: value = $selectedItems;
  let dropdownOpen = false;
</script>

<div class="flex w-full flex-col gap-2">
  {#if label}
    <label for={name} class="text-sm font-medium text-text">{label}</label>
  {/if}
  <div class="mx-auto flex w-full flex-col items-center">
    <div class="w-full">
      <div class="relative flex flex-col items-center">
        <div class="w-full">
          <button
            type="button"
            class="flex w-full min-w-full rounded-lg border border-slate-200 px-4 py-1 pr-2 focus:outline-brand"
            class:border-red-500={$formErrors && $formErrors[name]}
            class:rounded-b-none={dropdownOpen}
            on:click={() => (dropdownOpen = !dropdownOpen)}
          >
            <div class="flex flex-auto flex-wrap gap-1">
              {#each $selectedItems as item (item)}
                <div
                  class="flex items-center justify-center rounded-full border border-brand bg-brand/10 bg-white pl-2 pr-1 font-medium text-brand-dark"
                >
                  <div class="max-w-full flex-initial text-xs font-normal leading-none">{item[labelKey]}</div>
                  <button type="button" class="cursor-pointer hover:text-brand" on:click|stopPropagation={() => toggleItem(item)}>
                    <i class="fas fa-times-circle ml-2 h-4 w-4" />
                  </button>
                </div>
              {/each}
              {#if $selectedItems.length == 0}
                <div class="border px-1 opacity-0">no options</div>
              {/if}
            </div>
            <div class="flex cursor-pointer items-center">
              <i class="fas fa-chevron-down ml-2 mt-1 h-4 w-4 text-xs text-slate-500" />
            </div>
          </button>
          {#if dropdownOpen}
            <div class="top-100 max-h-select absolute left-0 z-40 w-full rounded-b-lg border border-slate-200 bg-white">
              {#each allItems as item}
                {#if !$selectedItems.includes(item)}<div
                    class="w-full cursor-pointer border-gray-100 hover:bg-slate-200"
                    on:click={() => toggleItem(item)}
                  >
                    <div class="flex w-full items-center p-2 text-sm">
                      <div class="text-gray-800">{item[labelKey]}</div>
                    </div>
                  </div>{/if}
              {/each}
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>
  {#if helperText}
    <span class="mt-0.5 text-xs text-gray-400">{helperText}</span>
  {/if}
  {#if $formErrors && $formErrors[name]}
    <span class="block pt-1 text-right text-sm text-red-500">{$formErrors[name]}</span>
  {/if}
</div>

<style>
  .top-100 {
    top: 100%;
  }
  .bottom-100 {
    bottom: 100%;
  }
  .max-h-select {
    max-height: 300px;
  }
  .dropdown:hover .dropdown-menu {
    display: block;
  }
</style>
