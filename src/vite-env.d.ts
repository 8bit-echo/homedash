/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'vue-renderless-calendar/lib/index';

interface ImportMetaEnv {
  readonly VITE_HUE_USERNAME: string
  readonly VITE_PLEX_TOKEN: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '@pqina/flip';