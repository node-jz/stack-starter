<script lang="ts">
  import { fly, fade } from 'svelte/transition';
  import { onMount } from 'svelte';
  import { createEventDispatcher } from 'svelte';
  import PrimaryButton from '$lib/assets/PrimaryButton.svelte';
  import SecondaryButton from '$lib/assets/SecondaryButton.svelte';
  import TertiaryButton from '$lib/assets/TertiaryButton.svelte';

  enum Colors {
    RED = 'red',
    GREEN = 'green',
    BLUE = 'blue',
  }

  const dispatchEvent = createEventDispatcher();

  export let title = 'Are you sure?';
  export let description = 'This action is permanent. Do you want to continue?';
  export let noLabel = 'No';
  export let yesLabel = 'Yes';
  export let bindingElement = null;
  export let color: string = Colors.RED;
  export let iconClass: string = 'far fa-exclamation-triangle';
  export let showImage = false;
  export let bigButtons = false;

  let scrollY;
  let modal;

  onMount((e) => {
    blockScrolling();
  });

  const blockScrolling = () => {
    scrollY = window.pageYOffset;
    const body = document.body;
    if (!bindingElement) {
      document.getElementById('main')?.appendChild(modal);
    } else {
      bindingElement?.appendChild(modal);
    }
    body.style.position = 'fixed';
    body.style.left = 0;
    body.style.right = 0;
    body.style.top = `-${scrollY}px`;
  };

  const enableScrolling = () => {
    const body = document.body;
    body.style.position = '';
    body.style.top = '';
    window.scrollTo(0, parseInt(scrollY || '0'));
  };

  let handleNo = (e) => {
    enableScrolling();
    dispatchEvent('no');
  };

  let handleYes = (e) => {
    enableScrolling();
    dispatchEvent('yes');
  };
</script>

<div bind:this={modal} class="fixed inset-0 z-50 h-full w-full sm:flex sm:items-center">
  <div class="fixed inset-0 h-full w-full bg-gray-400 bg-opacity-50" in:fade|local />
  <div class="fixed bottom-0 mx-auto my-auto w-full sm:relative sm:bottom-auto sm:w-auto" in:fly|local>
    <div
      class={`relative inline-block w-full transform overflow-hidden rounded-none bg-white
			p-8 pb-16 text-left align-bottom shadow-xl transition-all sm:max-w-lg sm:rounded-xl sm:pb-8 sm:align-middle ${color}`}
      data-play="confirm-modal"
    >
      <div class="sm:flex sm:items-start">
        <div class="ml-0 text-center sm:text-left">
          <h3
            class={`text-lg font-semibold leading-6 text-gray-900 ${showImage ? 'flex flex-col items-center text-center' : ''}`}
            id="modal-title"
          >
            {#if showImage}
              <img
                src="/onboard-cancel.svg"
                alt="dayslice logo watermelon with a white exclamation mark inside of a red circle in the beside it in the top right"
                class="mb-6"
              />
            {:else}
              <i class={`mr-2 text-xl ${iconClass} ${color}`} />
            {/if}
            {@html title}
          </h3>
          <div class="mt-2">
            <p class={`text-base text-gray-600 ${showImage ? 'text-center' : ''}`}>
              {@html description}
            </p>
          </div>
        </div>
      </div>
      <div class={`mt-5 flex flex-col sm:mt-4 sm:flex-row-reverse ${bigButtons ? 'gap-4' : ''}`}>
        {#if bigButtons}
          <PrimaryButton on:click={handleYes} type="button">
            {yesLabel}
          </PrimaryButton>
          <TertiaryButton
            on:click={handleNo}
            class="flex items-center rounded-full border border-gray-300 bg-gray-100 px-6 py-4 font-semibold text-gray-700 ring-2 ring-transparent ring-offset-1 hover:bg-gray-200 active:ring-gray-200"
          >
            {noLabel}
          </TertiaryButton>
        {:else}
          <PrimaryButton data-play="modal-yes" on:click={handleYes} type="button">{yesLabel}</PrimaryButton>
          <TertiaryButton data-play="modal-no" on:click={handleNo} type="button">{noLabel}</TertiaryButton>
        {/if}
      </div>
    </div>
  </div>
</div>
