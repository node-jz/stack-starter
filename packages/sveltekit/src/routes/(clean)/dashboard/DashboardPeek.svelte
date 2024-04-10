<script lang="ts">
  import PrimaryButton from '$lib/assets/PrimaryButton.svelte';
  import TertiaryButton from '$lib/assets/TertiaryButton.svelte';
  import PrimaryTextArea from '$lib/assets/form/PrimaryTextArea.svelte';
  import PrimaryTextInput from '$lib/assets/form/PrimaryTextInput.svelte';
  import SectionHeader from '$lib/assets/typo/SectionHeader.svelte';
  import userStore from '$lib/stores/user.store';
  import { onMount } from 'svelte';
  export let close: () => {};
  export let submit: (data: { id: string; label: string }) => {};
  let submitting = false;

  let formValues = {
    name: '',
  };

  onMount(() => {});
  const onSubmit = async () => {
    // save some data into the API and return the new thing:
    submit({ id: '123', label: 'New Thing' });
  };
</script>

<div class="flex h-full w-[480px] flex-col gap-2 overflow-y-hidden">
  <div class="flex w-full items-center justify-between px-6 py-2 text-sm font-medium text-text lg:px-8">
    Add New Something
    <button type="button" on:click={() => close()}><i class="fa-solid fa-close text-lg" /> </button>
  </div>
  <div class="flex-1 overflow-y-auto border-t border-t-slate-200 bg-backgroundSubtle px-2 py-2 lg:px-4">
    <form on:submit|preventDefault={onSubmit} class="flex flex-col gap-6 pb-12">
      <PrimaryTextInput bind:value={formValues.name} name="name" label="Name" />
    </form>
  </div>
  <div class="flex justify-end gap-2 border-t-2 border-t-slate-200 px-4 py-2 text-right">
    <TertiaryButton on:click={() => close()}>Cancel</TertiaryButton>
    <PrimaryButton disabled={submitting} type="submit" on:click={onSubmit}>Save Something</PrimaryButton>
  </div>
</div>
