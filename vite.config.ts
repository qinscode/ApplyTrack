import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from 'tailwindcss'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: 'stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true
    })
  ],
  css: {
    postcss: {
      plugins: [tailwindcss()]
    }
  },
  base: '/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    chunkSizeWarningLimit: 3000,
    rollupOptions: {
      external: ['hoist-non-react-statics'],
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'mui-vendor': ['@mui/material', '@mui/base', '@mui/utils'],
          'radix-vendor': [
            '@radix-ui/react-accordion',
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-popover',
            '@radix-ui/react-select',
            '@radix-ui/react-tabs'
          ]
        }
      }
    }
  }
})
