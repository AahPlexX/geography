import { readFileSync } from 'node:fs';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

const { version } = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8')) as { version: string };

// Deployed clients poll this file to learn a newer build exists (see src/components/UpdatePrompt.tsx).
const emitVersionManifest = (): Plugin => ({
  name: 'emit-version-manifest',
  generateBundle() {
    this.emitFile({ type: 'asset', fileName: 'version.json', source: JSON.stringify({ version }) });
  },
});

export default defineConfig({
  base: '/geography/',
  define: { __APP_VERSION__: JSON.stringify(version) },
  plugins: [react(), tailwindcss(), emitVersionManifest()],
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        exam: fileURLToPath(new URL('./exam/index.html', import.meta.url)),
        map: fileURLToPath(new URL('./map/index.html', import.meta.url)),
        explore: fileURLToPath(new URL('./explore/index.html', import.meta.url)),
      },
    },
  },
});
