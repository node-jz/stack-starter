<script lang="ts">
  import PrimaryButton from '$lib/assets/PrimaryButton.svelte';
  import PageHeader from '$lib/assets/typo/PageHeader.svelte';
  import { onMount } from 'svelte';
  import { modalStore } from '$lib/layout/Modal/modal.store';
  import userStore from '$lib/stores/user.store';
  import DashboardPeek from './DashboardPeek.svelte';

  onMount(async () => {
    load();
  });

  const load = async () => {};

  const handleOpenModal = () => {
    modalStore.open(DashboardPeek, {}, handleModalClosed, handleModalSaved, 250);
  };

  const handleModalClosed = async () => {
    console.info('closed modal without saving');
  };

  const handleModalSaved = async () => {
    console.info('closed modal with a save expectation');
  };
</script>

<div id="wrapper" class="mx-auto flex w-full max-w-2xl flex-col gap-4 pt-4 font-sans text-text">
  <div class="flex flex-col gap-2">
    <div class="flex items-center justify-between">
      <PageHeader>Dashboard</PageHeader>
      <div class="w-fit self-end">
        <PrimaryButton on:click={handleOpenModal}>Open Modal</PrimaryButton>
      </div>
    </div>
    {#if $userStore.user}
      <span class="border-t border-t-slate-200 pt-4 text-sm text-text">Hi, {$userStore.user.name}.</span>
    {/if}
  </div>
  <div class="flex flex-col gap-2">This is your dashboard. Load some data, and show some things.</div>
</div>
