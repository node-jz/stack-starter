<script lang="ts">
  import userStore from '$lib/stores/user.store';
  import { onDestroy, onMount } from 'svelte';

  // Profile-specific props can be added here
  let menuVisible = false;
  let menuRef: HTMLElement;
  let doc: Document;

  onMount(() => {
    if (document) {
      doc = document;
    }
  });
  function handleShowMenu(e: MouseEvent) {
    menuVisible = true;
    updateListener();
  }

  function handleClickOutside(event: MouseEvent) {
    if (menuRef && !menuRef.contains(event.target as Node)) {
      menuVisible = false;
      updateListener();
    }
  }

  const updateListener = () => {
    if (doc) {
      if (menuVisible) {
        doc.body.addEventListener('click', handleClickOutside);
      } else {
        doc.body.removeEventListener('click', handleClickOutside);
      }
    }
  };

  onDestroy(() => {
    menuVisible = false;
    updateListener();
  });
</script>

{#if $userStore}
  <button role="button" class="hidden sm:block" on:click|stopPropagation={handleShowMenu}>
    <img class="h-8 w-8 rounded-full bg-gray-50" src={$userStore.user?.picture_url} alt="" referrerpolicy="no-referrer" />
    <span class="sr-only">Your profile</span>
  </button>

  {#if menuVisible}
    <div
      bind:this={menuRef}
      class="absolute -bottom-10 right-10 z-30 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="user-menu-button"
      tabindex="-1"
    >
      <!-- Active: "bg-gray-100", Not Active: "" -->
      <a
        on:click={handleClickOutside}
        href="/logout"
        class="block rounded px-4 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-800"
        role="menuitem"
        tabindex="-1"
        id="user-menu-item-2">Sign out</a
      >
    </div>
  {/if}
{/if}
