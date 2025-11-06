import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  define: {
    'process.env': {},
  },
  build: {
    lib: {
      entry: './src/main.js',
      name: 'TandRCalculators',
      fileName: 'tandr-calculators',
      formats: ['iife'],
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
});

