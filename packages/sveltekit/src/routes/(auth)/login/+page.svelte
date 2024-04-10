<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import Logo from '$lib/assets/Logo.svelte';
  import cookieStore from '$lib/stores/cookie.store';
  import userStore from '$lib/stores/user.store';
  import userApi from '$lib/utils/api/user.api';
  import { getBrowserTimeZone } from '$lib/utils/timezones';
  import { tracker } from '$lib/utils/tracking/tracking';
  import { DateTime } from 'luxon';
  import { onMount } from 'svelte';

  enum ViewStates {
    SIGN_IN = 'sign_in',
    VERIFYING_AUTH = 'verifying',
  }
  let viewState: ViewStates = ViewStates.SIGN_IN;

  onMount(async () => {
    const user = await cookieStore.getUserFromCookie();
    tracker.trackEvent('loginPage.view');
    if (user) {
      tracker.trackEvent('loginPage.savedSignIn', {});
      /* #TODO set your main landing page after sign-in */
      goto('/');
      return;
    }

    const hasAuthToken = await checkForToken();
    if (hasAuthToken) {
      tracker.trackEvent('loginPage.signedIn', {});
      handleSuccessfulSignIn();
    }
  });

  const checkForToken = async () => {
    if (!$page.url.searchParams.get('token')) {
      viewState = ViewStates.SIGN_IN;
      return false;
    }
    viewState = ViewStates.VERIFYING_AUTH;
    await cookieStore.saveJwt($page.url.searchParams.get('token') ?? '', Number($page.url.searchParams.get('expires')) ?? 60000);
    return true;
  };

  const handleSuccessfulSignIn = async () => {
    const user = await userApi.getMe();
    $userStore.user = user;
    const customEvent = new CustomEvent('extensionJwt', { detail: cookieStore.getJwt() });
    document.dispatchEvent(customEvent);
    if (DateTime.fromISO(user.created_at).diffNow('minutes').minutes < 2) {
      tracker.trackEvent('onboarding.signup');
    }
    /* #TODO set your main landing page after sign-in */
    goto('/');
  };

  const handleStartTextClicked = () => {
    tracker.trackEvent('loginPage.googleClicked', { type: 'text' });
  };
  const handleGoogleClicked = () => {
    tracker.trackEvent('loginPage.googleClicked', { type: 'button' });
  };
</script>

<div class="flex h-full w-full flex-col lg:flex-row">
  <div
    class="my-auto flex h-full w-full flex-col items-start justify-center border-b border-slate-200 bg-white px-14 py-12 text-left lg:w-fit lg:items-center lg:border-r"
  >
    <div class="flex w-full items-center justify-start gap-2">
      <Logo />
    </div>
    <div class="mt-10">
      <h3 class="text-secondary mb-2 text-base font-bold leading-9 tracking-tight">Sign-in to your account</h3>

      <div>
        {#if viewState == ViewStates.SIGN_IN}
          <div class="mx-0 max-w-fit">
            <a
              href={`${import.meta.env['VITE_API_URL']}/auth/google`}
              on:click={handleGoogleClicked}
              class="group flex items-center justify-between gap-2 rounded-full border-2 border-gray-300 px-4 py-2 transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100"
            >
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" class="w-5" alt="google logo" />
              <span
                class="block w-max text-sm font-semibold tracking-wide text-gray-700 transition duration-300 group-hover:text-blue-600 dark:text-white"
                >Continue with Google
              </span>
            </a>
          </div>
        {/if}
        <p class="mt-2 text-sm leading-6 text-gray-500">
          Not a member?
          <a
            href={`${import.meta.env['VITE_API_URL']}/auth/google`}
            class="cursor-pointer font-semibold text-brand hover:text-brand-dark"
            on:click={handleStartTextClicked}>Create an account.</a
          >
        </p>
      </div>
    </div>
  </div>
  <div class="flex flex-1 flex-col items-center justify-center gap-4 bg-white bg-cover" style="background-image: url('/signin_bg.png')" />
</div>
