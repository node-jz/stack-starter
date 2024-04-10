<script lang="ts">
  export let full = false;
</script>

<button
  type="button"
  {...$$restProps}
  on:click
  class={`cursor-pointer text-white font-semibold font-header rounded-full py-2 px-4 text-sm bg-brand hover:bg-brand-dark focus:bg-brand-dark focus:ring-2 focus:ring-brand-light active:bg-brand-dark disabled:bg-slate-200 disabled:cursor-not-allowed disabled:text-slate-400`}
  class:w-full={full}><slot /></button
>
