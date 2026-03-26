import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import type { Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { themeShift } from '@themeshift/vite-plugin-themeshift';
import type { OutputAsset, OutputBundle, OutputChunk } from 'rollup';

function injectComponentCss(): Plugin {
  return {
    name: 'inject-component-css',
    generateBundle(_options: unknown, bundle: OutputBundle) {
      const cssAssetsToRemove = new Set<string>();

      for (const chunk of Object.values(bundle)) {
        if (chunk.type !== 'chunk' || !chunk.isEntry) {
          continue;
        }

        if (!chunk.fileName.startsWith('components/') || !chunk.fileName.endsWith('/index.js')) {
          continue;
        }

        const importedCss = Array.from(chunk.viteMetadata?.importedCss ?? []);

        if (importedCss.length === 0) {
          continue;
        }

        const cssParts: string[] = [];

        for (const cssFileName of importedCss) {
          const asset = bundle[cssFileName] as OutputAsset | OutputChunk | undefined;

          if (!asset || asset.type !== 'asset') {
            continue;
          }

          cssParts.push(typeof asset.source === 'string' ? asset.source : asset.source.toString());
          cssAssetsToRemove.add(cssFileName);
        }

        if (cssParts.length === 0) {
          continue;
        }

        const styleFileName = `${path.posix.dirname(chunk.fileName)}/style.css`;

        this.emitFile({
          type: 'asset',
          fileName: styleFileName,
          source: cssParts.join('\n'),
        });

        chunk.code = `import "./style.css";\n${chunk.code}`;
      }

      for (const cssFileName of cssAssetsToRemove) {
        delete bundle[cssFileName];
      }
    },
  };
}

export default defineConfig({
  publicDir: false,
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  plugins: [
    react(),
    injectComponentCss(),
    themeShift({
      cssVarPrefix: 'themeshift',
      platforms: ['css', 'meta'],
    }),
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    cssCodeSplit: true,
    lib: {
      entry: {
        'components/Button/index': fileURLToPath(
          new URL('./src/components/Button/index.ts', import.meta.url),
        ),
        'components/Heading/index': fileURLToPath(
          new URL('./src/components/Heading/index.ts', import.meta.url),
        ),
      },
      formats: ['es'],
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: 'chunks/[name]-[hash].js',
        assetFileNames: 'assets/[name][extname]',
      },
    },
  },
});
