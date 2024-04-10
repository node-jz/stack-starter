<script lang="ts">
  import { goto } from '$app/navigation';
  import cookieStore from '$lib/stores/cookie.store';
  import userStore from '$lib/stores/user.store';
  import { tracker } from '$lib/utils/tracking/tracking';
  import { onMount } from 'svelte';

  onMount(async () => {
    tracker.trackEvent('logoutPage.logout');
    cookieStore.clearJwt();
    $userStore.user = undefined;
    return goto('/login');
  });
</script>
