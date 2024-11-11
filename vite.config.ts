import type { ConfigEnv, Plugin, PluginOption, UserConfig } from "vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "node:path";
import { visualizer } from "rollup-plugin-visualizer";
import type { VitePWAOptions } from "vite-plugin-pwa";
import { VitePWA } from "vite-plugin-pwa";
import viteCompression from "vite-plugin-compression";
import postcssImport from "postcss-import";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

// PWA 配置
const pwaConfig: Partial<VitePWAOptions> = {
  registerType: "autoUpdate",
  workbox: {
    maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
    globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2}"],
    globIgnores: [".stats/**/*"],
  },
  manifest: {
    name: "Job Application Tracker",
    short_name: "JobTracker",
    theme_color: "#ffffff",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
};

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
  const isProduction = mode === "production";

  const plugins: PluginOption[] = [react(), viteCompression()];

  if (isProduction) {
    plugins.push(
      visualizer({
        filename: "dist/stats.html",
        gzipSize: true,
        brotliSize: true,
        open: false,
      }) as unknown as Plugin
    );
  }

  plugins.push(VitePWA(pwaConfig));

  return {
    base: "/",

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },

    plugins,

    server: {
      port: 3000,
      open: true,
      cors: true,
      proxy: {
        "/api": {
          target: "http://localhost:5051",
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/api/, ""),
        },
      },
    },

    build: {
      outDir: "dist",
      sourcemap: command === "serve",
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          dir: "dist",
          entryFileNames: "assets/[name].[hash].js",
          chunkFileNames: "assets/[name].[hash].js",
          assetFileNames: "assets/[name].[hash].[ext]",
          manualChunks: {
            "react-core": ["react", "react-dom", "react-router-dom"],
            "ui-core": [
              "@radix-ui/react-dialog",
              "@radix-ui/react-dropdown-menu",
            ],
            charts: ["recharts", "d3-shape", "d3-scale"],
            utils: ["lodash", "axios", "dayjs"],
            animations: ["framer-motion"],
          },
        },
      },

      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: isProduction,
          drop_debugger: isProduction,
        },
      },
    },

    css: {
      modules: {
        scopeBehaviour: "local",
        localsConvention: "camelCase",
        generateScopedName: isProduction
          ? "[hash:base64:8]"
          : "[name]__[local]__[hash:base64:5]",
      },
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
      devSourcemap: true,
      postcss: {
        plugins: [postcssImport, tailwindcss, autoprefixer],
      },
    },

    optimizeDeps: {
      include: [
        "react",
        "react-dom",
        "react-router-dom",
        "recharts",
        "axios",
        "lodash-es",
      ],
      exclude: ["@tinymce/tinymce-react"],
    },
  };
});
