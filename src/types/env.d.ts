/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_APP_TITLE: string;
  // 添加其他环境变量
  [key: string]: any;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
