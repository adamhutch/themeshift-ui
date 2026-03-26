import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { themeShift } from '@themeshift/vite-plugin-themeshift';

// https://vite.dev/config/
export default defineConfig({
  /* Path aliases */
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  /* Plugins */
  plugins: [react(), themeShift()],
});
