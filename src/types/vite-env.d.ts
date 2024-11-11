/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

declare module "rollup-plugin-visualizer" {
  import type { Plugin } from "vite";

  export function visualizer(options?: any): Plugin;
}

declare module "vite-plugin-compression" {
  import type { Plugin } from "vite";
  export default function viteCompression(options?: any): Plugin;
}
