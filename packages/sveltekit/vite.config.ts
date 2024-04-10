import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  root: 'packages/sveltekit',
  publicDir: 'packages/sveltekit/static',
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  optimizeDeps: {
    exclude: ['@nestjs*', 'nestjs*'],
  },
});
