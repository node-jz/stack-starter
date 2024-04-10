<script>
  import { DateTime } from 'luxon';
</script>

<main class="relative z-10 flex w-full flex-col gap-0 bg-none text-text sm:gap-12">
  <nav class="border-b-2 border-slate-200 bg-backgroundSubtle text-text backdrop-blur-sm sm:bg-white/70 sm:text-text">
    <div class="flex justify-between px-4 py-2 sm:px-6 lg:px-10">
      <div class="flex w-full gap-8">
        <span class="flex items-center gap-4">
          <a href={import.meta.env['BASE_URL']}>
            <img src="/cyborg.png" class="h-10 w-10" alt={`${import.meta.env['VITE_PROJECT_NAME']}`} /></a
          >
        </span>
        <!-- menu -->
      </div>
    </div>
  </nav>
  <div class="mx-auto flex w-full max-w-[1000px] flex-1 rounded-xl bg-white shadow-soft">
    <slot />
  </div>
  <footer class="w-full bg-brand-dark px-8 py-2 text-xs text-white">
    <div class="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-4 md:flex-row">
      <div class="flex flex-col items-center gap-1 md:flex-row md:items-start">
        Copyright {DateTime.now().year.toLocaleString()}, {import.meta.env['VITE_PROJECT_NAME']}
        <ul class="flex items-center gap-2 text-center text-sm">
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
</main>
