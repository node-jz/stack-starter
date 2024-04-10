<script lang="ts">
  import Logo from '$lib/assets/Logo.svelte';
  import UserMenu from '$lib/layout/UserMenu.svelte';
  import { onMount } from 'svelte';

  onMount(() => {});
</script>

<div class="absolute inset-0 left-0 bg-backgroundSubtle px-6 py-10">
  <div class="flex h-full flex-col gap-10">
    <Logo />
    <div class="flex flex-1 flex-col gap-2">
      <h3 class="text-sm font-medium text-text"><a href="/dashboard"> <i class="fa-light fa-grid-2 w-4" /> Dashboard</a></h3>
      <!--
      Add any other menu items here
      <h3 class="text-sm font-medium text-text"><a href="/leads"> <i class="fa-light fa-user w-4" /> Leads</a></h3> 
      -->
    </div>
    <div class="relative w-full">
      <UserMenu />
    </div>
  </div>
</div>
