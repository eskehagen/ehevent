import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

/**
 * Separat build til prerendering.
 *
 * Producerer dist-ssr/entry-server.js (renderer React-træet i Node) og
 * dist-ssr/seo.js (metadata + JSON-LD). Kører kun ved build — den rører
 * ikke udviklingsserveren eller klient-bundlen.
 */
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, '.') },
  },
  build: {
    ssr: true,
    outDir: 'dist-ssr',
    emptyOutDir: true,
    minify: false,
    rollupOptions: {
      input: {
        'entry-server': path.resolve(__dirname, 'src/entry-server.tsx'),
        seo: path.resolve(__dirname, 'src/entry-seo.ts'),
      },
      output: { format: 'es', entryFileNames: '[name].js' },
    },
  },
});
