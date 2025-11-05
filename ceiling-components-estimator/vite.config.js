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
      name: 'CeilingComponentsEstimator',
      fileName: (format) => `ceiling-components-estimator.${format}.js`,
      formats: ['iife']
    },
    rollupOptions: {
      output: {
        // Ensure CSS is extracted
        assetFileNames: 'ceiling-components-estimator.[ext]',
        inlineDynamicImports: true
      }
    },
    cssCodeSplit: false,
    outDir: 'dist'
  }
})

