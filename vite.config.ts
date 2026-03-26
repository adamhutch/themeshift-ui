import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { themeShift } from '@themeshift/vite-plugin-themeshift';

// https://vite.dev/config/
export default defineConfig({
  publicDir: false,
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  plugins: [
    react(),
    themeShift({
      cssVarPrefix: 'themeshift',
      platforms: ['css', 'meta'],
    }),
  ],
  build: {
    outDir: 'dist-app',
    emptyOutDir: true,
  },
});
