import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: '/geography/',
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        exam: fileURLToPath(new URL('./exam/index.html', import.meta.url)),
        map: fileURLToPath(new URL('./map/index.html', import.meta.url)),
      },
    },
  },
});
