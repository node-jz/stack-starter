<script>
  export let checked = false;
  export let label = '';
</script>

<label class="inline-flex items-center cursor-pointer text-secondary text-sm">
  <input type="checkbox" class="hidden" bind:checked on:change />
  <span
    class={`mr-2 rounded w-4 h-4 border border-secondary bg-white text-center flex flex-col items-center justify-center`}
    class:!bg-brand={checked}
    class:!border-brand-dark={checked}
    aria-hidden="true"><i class="fa-solid fa-check text-white leading-none text-xxs" /></span
  >
  {#if label}
    <span class="select-none">{label}</span>
  {/if}
</label>
