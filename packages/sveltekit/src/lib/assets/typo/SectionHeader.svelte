<script lang="ts">
  export let subtitle: string = '';
  export let inverse: boolean = false;
</script>

<div class="flex flex-col gap-0">
  <h2 class="flex flex-row justify-between font-header text-lg font-semibold leading-snug text-text" class:!text-white={inverse}>
    <slot />
  </h2>
  {#if subtitle}
    <span class="text-xs text-secondary">
      {subtitle}
    </span>
  {/if}
</div>
