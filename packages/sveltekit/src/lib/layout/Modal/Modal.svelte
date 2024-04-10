<!-- file: components/Modal.svelte -->
<script lang="ts">
  import type { SvelteComponent } from 'svelte';
  import { onDestroy } from 'svelte';
  import { modalStore } from './modal.store';

  let isOpen = false;
  let ContentComponent: typeof SvelteComponent<Record<string, any>> | null = null;
  let props: Record<string, any> = {};
  const unsubscribe = modalStore.subscribe(({ isOpen: open, content, props: pr }) => {
    isOpen = open;
    ContentComponent = content;
    props = pr;
  });

  onDestroy(unsubscribe);

  function close() {
    modalStore.close();
  }
</script>

{#if isOpen}
  <div
    data-testid="modal-wrapper"
    class="absolute inset-0 z-40 flex flex-col items-center justify-center bg-slate-700 bg-opacity-40 backdrop-blur-sm"
    on:click={close}
  >
    <div data-testid="modal-content" class="h-fit max-h-96 w-full max-w-xl overflow-y-auto rounded bg-white p-8" on:click|stopPropagation>
      {#if ContentComponent}
        <svelte:component this={ContentComponent} {...props} {close} on:submit={$modalStore.onSubmit} />
      {/if}
    </div>
  </div>
{/if}
