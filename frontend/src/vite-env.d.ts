/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_API_KEY: string
  readonly VITE_FIRMA_NETWORK: string
  readonly VITE_FIRMA_RPC_URL: string
  readonly VITE_ENABLE_ANALYTICS: string
  readonly VITE_ENABLE_DEMO_MODE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}