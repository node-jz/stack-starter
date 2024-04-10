<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import userStore from '$lib/stores/user.store';
  import cookieStore from '$lib/stores/cookie.store';
  import { goto } from '$app/navigation';
  import Peek from '$lib/layout/Peek/Peek.svelte';
  import { tracker } from '$lib/utils/tracking/tracking';
  import { browser } from '$app/environment';
  import { writable } from 'svelte/store';
  import { setScroller } from '$lib/utils/scroll';
  import { DateTime } from 'luxon';
  export const prerender = false;

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
    tracker.init();
    tracker.identifyUser($userStore.user.id, $userStore.user.email, $userStore.user.name);
  });
</script>

<main class="absolute inset-0 z-10 flex w-full flex-col bg-none text-text">
  <div class="relative mx-auto flex w-full flex-1 overflow-hidden bg-white">
    <div class="absolute inset-0 flex flex-col">
      <div class="flex-1 overflow-y-auto">
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
