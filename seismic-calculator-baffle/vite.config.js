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
      external: ['pdfmake/build/pdfmake', 'pdfmake/build/vfs_fonts'], // Don't bundle pdfmake
      output: {
        assetFileNames: 'seismic-calculator-baffle.[ext]',
        inlineDynamicImports: true, // Required for IIFE format
        globals: {
          'pdfmake/build/pdfmake': 'pdfMake',
          'pdfmake/build/vfs_fonts': 'pdfFonts'
        }
      }
    },
    cssCodeSplit: false,
    outDir: 'dist'
  }
})

