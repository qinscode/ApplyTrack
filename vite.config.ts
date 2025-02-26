import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig, Plugin } from 'vite'
import tailwindcss from 'tailwindcss'
import { visualizer } from 'rollup-plugin-visualizer'

// Custom plugin: Optimize preload behavior
function optimizePreloadPlugin(): Plugin {
  return {
    name: 'optimize-preload',
    transformIndexHtml(html, ctx) {
      // Only apply in production build
      if (!ctx.bundle) return html

      // Remove auto-generated preload tags
      html = html.replace(/<link rel="modulepreload".*?>/g, '')

      // Get all entry scripts and critical dependencies
      const entryScripts = Object.keys(ctx.bundle || {})
        .filter((key) => key.includes('index') && key.endsWith('.js'))
        .map((key) => ctx.bundle?.[key])
        .filter(Boolean)

      const reactVendor = Object.keys(ctx.bundle || {})
        .filter((key) => key.includes('react-vendor') && key.endsWith('.js'))
        .map((key) => ctx.bundle?.[key])
        .filter(Boolean)

      // Combine entry scripts and React vendor scripts
      const criticalScripts = [...reactVendor, ...entryScripts]

      if (criticalScripts.length > 0) {
        const preloadTags = criticalScripts
          .map((chunk) => {
            const fileName = chunk.fileName
            return `<link rel="preload" href="${fileName}" as="script" fetchpriority="high" crossorigin />`
          })
          .join('\n')

        // Insert preload tags before the end of head
        html = html.replace('</head>', `${preloadTags}\n</head>`)
      }

      return html
    }
  }
}

// Custom plugin: Ensure React is loaded before Radix UI
function ensureReactFirstPlugin(): Plugin {
  return {
    name: 'ensure-react-first',
    transformIndexHtml(html) {
      // Add React global variables to ensure they're available before all modules
      const reactGlobalScript = `
        <script>
          // Ensure React global variables are available
          window.React = window.React || {};
          window.React.forwardRef = function(render) {
            return { render: render, $$typeof: Symbol.for('react.forward_ref') };
          };
          window.React.createContext = function(defaultValue) {
            return { Provider: { $$typeof: Symbol.for('react.provider') }, Consumer: { $$typeof: Symbol.for('react.context') }, _currentValue: defaultValue };
          };
        </script>
      `

      // Insert script before the end of head
      return html.replace('</head>', `${reactGlobalScript}\n</head>`)
    }
  }
}

export default defineConfig({
  plugins: [
    react(),
    optimizePreloadPlugin(),
    ensureReactFirstPlugin(),
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
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      react: fileURLToPath(new URL('./node_modules/react', import.meta.url)),
      'react-dom': fileURLToPath(new URL('./node_modules/react-dom', import.meta.url))
    }
  },
  build: {
    chunkSizeWarningLimit: 3000,
    // Disable default module preload, use our custom plugin instead
    modulePreload: false,
    rollupOptions: {
      output: {
        // Ensure entry file contains necessary initialization code
        entryFileNames: 'assets/[name]-[hash].js',
        // Optimize code splitting strategy - using a simpler approach
        manualChunks: {
          // Put React and React DOM in one chunk
          'react-vendor': ['react', 'react-dom', 'react/jsx-runtime'],

          // Put all Radix UI components in one chunk
          'radix-vendor': [
            '@radix-ui/react-accordion',
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-popover',
            '@radix-ui/react-select',
            '@radix-ui/react-tabs',
            '@radix-ui/react-slot'
          ]
        }
      }
    }
  },
  // Optimize dependency pre-bundling
  optimizeDeps: {
    include: ['react', 'react-dom', 'react/jsx-runtime']
  }
})
