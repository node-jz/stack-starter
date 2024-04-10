<script lang="ts">
  import { fly, fade } from 'svelte/transition';
  import { quadIn, quadOut } from 'svelte/easing';
  import { modalStore } from '../Modal/modal.store';
  import { onDestroy, onMount, type SvelteComponent } from 'svelte';
  import { disableScrollHandling } from '$app/navigation';
  let scrollY: string;
  let doc: Document;

  let direction = 1; // 1 for from right, 2 for from left;
  onMount(() => {
    if (document) {
      doc = document;
    }
  });

  const getTransitionX = () => {
    return window.innerWidth < 1024 ? 576 : 768;
  };

  const blockScrolling = () => {
    if (!doc) {
      return;
    }
    scrollY = window.pageYOffset.toString();
    const body = doc.body;
    body.style.position = 'fixed';
    body.style.left = '0';
    body.style.right = '0';
    body.style.top = `-${scrollY}px`;
  };

  const enableScrolling = () => {
    if (!doc) {
      return;
    }
    const body = doc.body;

    body.removeAttribute('style');
    window.scrollTo(0, parseInt(scrollY || '0'));
  };

  let isOpen = false;
  let ContentComponent: typeof SvelteComponent<Record<string, any>> | null = null;
  let props: Record<string, any> = {};
  const unsubscribe = modalStore.subscribe(({ isOpen: open, content, props: pr }) => {
    isOpen = open;
    if (isOpen) {
      direction = pr.hasOwnProperty('direction') ? pr.direction : 1;
      blockScrolling();
    } else {
      enableScrolling();
    }
    ContentComponent = content;
    props = pr;
  });

  onDestroy(() => {
    enableScrolling();
    unsubscribe();
  });

  function close() {
    modalStore.close();
  }

  function submit(data: any) {
    modalStore.submit(data);
  }
</script>

{#if isOpen}
  <!-- This example requires Tailwind CSS v2.0+ -->
  <div class="fixed inset-0 z-50 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute inset-0 bg-white bg-opacity-75" aria-hidden={$modalStore.content !== null} transition:fade={{ duration: 300 }} />
      <div class={`fixed inset-y-0 flex max-w-full ${direction == 1 ? 'right-0 pl-0 md:pl-10' : 'left-0 pr-0 md:pr-10'}`}>
        <div
          class={`relative md:pl-0 w-fit`}
          in:fly={{ easing: quadOut, opacity: 1, duration: 300, x: getTransitionX() * direction }}
          out:fly={{ easing: quadIn, opacity: 1, duration: 300, x: getTransitionX() * direction }}
        >
          <div class="absolute left-0 top-0 -mr-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4" />
          <div class={`relative flex h-full w-full flex-col bg-white shadow-xl`} on:click|stopPropagation>
            <svelte:component this={ContentComponent} {...props} {close} {submit} />
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}
