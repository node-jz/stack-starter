<script lang="ts">
  import SectionHeader from '$lib/assets/typo/SectionHeader.svelte';

  export let label: string;
  export let hasBg: boolean = true;
  export let brandColor = false;

  export let description: string | null = null;
</script>

<div class="flex flex-col gap-1 rounded-lg border border-slate-200 bg-white px-6 py-6" class:!bg-brand-dark={brandColor}>
  <div class="flex items-center justify-between">
    <h2 class="text-lg font-medium text-gray-950">{label}</h2>
    <slot name="headerAction" />
  </div>
  {#if description}
    <span class="text-sm text-text" class:!text-white={brandColor}>
      {description}
    </span>
  {/if}
  <slot />
</div>
