<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import cookieStore from '$lib/stores/cookie.store';
  import userStore from '$lib/stores/user.store';
  import userApi from '$lib/utils/api/user.api';
  import { getBrowserTimeZone } from '$lib/utils/timezones';
  import { tracker } from '$lib/utils/tracking/tracking';
  import { DateTime } from 'luxon';
  import { onMount } from 'svelte';
  enum ViewStates {
    SIGNED_IN = 'signed_in',
    VERIFYING_AUTH = 'verifying',
  }
  let viewState: ViewStates = ViewStates.VERIFYING_AUTH;

  onMount(async () => {
    const user = await cookieStore.getUserFromCookie();
    tracker.trackEvent('loginPage.view');
    if (user) {
      tracker.trackEvent('loginPage.ext.alreadySignedIn', {});

      viewState = ViewStates.SIGNED_IN;
      const customEvent = new CustomEvent('extensionJwt', { detail: cookieStore.getJwt() });
      document.dispatchEvent(customEvent);
      console.log('dispatche custgom eve', customEvent);
      return;
    }

    const hasAuthToken = await checkForToken();
    console.log('checked for auh thoke', hasAuthToken);
    if (hasAuthToken) {
      tracker.trackEvent('loginPage.ext.signedIn', {});
      handleSuccessfulSignIn();
    }
  });

  const checkForToken = async () => {
    if (!$page.url.searchParams.get('token')) {
      viewState = ViewStates.VERIFYING_AUTH;
      return false;
    }
    viewState = ViewStates.SIGNED_IN;
    await cookieStore.saveJwt($page.url.searchParams.get('token') ?? '', Number($page.url.searchParams.get('expires')) ?? 60000);
    return true;
  };

  const handleSuccessfulSignIn = async () => {
    const user = await userApi.getMe();
    $userStore.user = user;
    const customEvent = new CustomEvent('extensionJwt', { detail: cookieStore.getJwt() });
    document.dispatchEvent(customEvent);
    console.log('dispatche custgom eve', customEvent);
    tracker.identifyUser(user.id, user.email, user.name);
  };
</script>

<div class="flex h-full w-full flex-col lg:flex-row">
  <div class="flex flex-1 flex-col items-center justify-center gap-4 bg-white">
    <div class="mx-auto flex max-w-lg flex-col items-start gap-6 px-4 py-10 text-left align-middle">You can close this window now.</div>
  </div>
</div>
