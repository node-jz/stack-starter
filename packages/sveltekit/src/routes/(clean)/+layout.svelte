<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import userStore from '$lib/stores/user.store';
  import cookieStore from '$lib/stores/cookie.store';
  import { goto } from '$app/navigation';
  import Peek from '$lib/layout/Peek/Peek.svelte';
  import Sidebar from './sidebar.svelte';
  import { browser } from '$app/environment';
  import { writable } from 'svelte/store';
  import { setScroller } from '$lib/utils/scroll';
  import Logo from '$lib/assets/Logo.svelte';
  import { DateTime } from 'luxon';
  export const prerender = false;
  let showMobileMenu = false;
  let onMobile = false;

  const windowWidth = writable(browser ? window.innerWidth : 0);
  $: onMobile = $windowWidth < 1024;
  if (browser) {
    const handleResize = () => {
      windowWidth.set(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    onDestroy(() => {
      window.removeEventListener('resize', handleResize);
    });
  }

  onMount(async () => {
    const jwt = await cookieStore.getJwt();
    if (!jwt) {
      return goto('/login');
    }
    if (!$userStore.user) {
      $userStore.user = await cookieStore.getUserFromCookie();
    }
    if (!$userStore.user) {
      return goto('/login');
    }

    setScroller(document.getElementById('scroller'));
  });
</script>

<main class="absolute inset-0 z-10 flex w-full flex-col bg-none text-text">
  <nav class="block border-b border-slate-200 bg-white text-text backdrop-blur-sm sm:bg-white/70 sm:text-text lg:hidden">
    <div class="flex justify-between px-4 py-2 sm:px-6 lg:px-10">
      <div class="flex w-full gap-8">
        <Logo />
      </div>
      <div class="flex items-center gap-2">
        <button
          class:!hidden={showMobileMenu}
          aria-hidden="true"
          type="button"
          class="relative inline-flex items-center justify-center rounded-md p-2 text-text focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand"
          aria-controls="mobile-menu"
          aria-expanded="false"
          on:click={() => {
            showMobileMenu = !showMobileMenu;
          }}
        >
          <span class="absolute -inset-0.5" />
          <span class="sr-only">Open main menu</span>
          <span class="block h-6 w-6 stroke-white">
            <i class="fa-solid fa-bars" />
          </span>
        </button>
      </div>
    </div>
  </nav>

  <div class="relative mx-auto flex w-full flex-1 overflow-hidden bg-white">
    {#if showMobileMenu && onMobile}
      <div class="relative z-50 lg:hidden" role="dialog" aria-modal="true">
        <button class="fixed inset-0 bg-slate-200/80" on:click={() => (showMobileMenu = false)} />

        <div class="pointer-events-none fixed inset-0 flex">
          <div class="pointer-events-auto relative mr-16 flex w-full max-w-xs flex-1">
            <Sidebar />
          </div>
        </div>
      </div>
    {:else}<div class="hidden border-r border-slate-300 lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-60 lg:flex-col"><Sidebar /></div>
    {/if}

    <div class="absolute inset-0 flex flex-col bg-background lg:left-60">
      <div id="scroller" class="flex-1 overflow-y-auto scroll-smooth">
        <slot />
      </div>
      <footer class="text-secondary w-full border-t border-slate-200 bg-white px-8 py-2 text-xs">
        <div class="mx-auto flex w-full flex-col items-center gap-1 sm:flex-row sm:gap-4">
          <div class="flex flex-row items-center gap-1">
            Copyright {DateTime.now().year.toLocaleString()}, {import.meta.env['VITE_PROJECT_NAME']}
            <ul class="hidden items-center gap-2 text-center text-sm sm:flex">
              <li><i class="fa-x-twitter fa-brands" /></li>
              <li><i class="fa-youtube fa-brands" /></li>
              <li><i class="fa-instagram fa-brands" /></li>
            </ul>
          </div>
          <div class="flex-1" />
          <ul class="flex flex-row gap-3">
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/tos">Terms of Service</a></li>
          </ul>
        </div>
      </footer>
    </div>
  </div>
</main>
<Peek />
