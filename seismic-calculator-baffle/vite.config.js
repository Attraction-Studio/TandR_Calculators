import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  define: {
    'process.env': {}
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.js'),
      name: 'SeismicCalculatorBaffle',
      fileName: (format) => `seismic-calculator-baffle.${format}.js`,
      formats: ['iife']
    },
    rollupOptions: {
      output: {
        assetFileNames: 'seismic-calculator-baffle.[ext]',
        inlineDynamicImports: true
      }
    },
    cssCodeSplit: false,
    outDir: 'dist'
  }
})

