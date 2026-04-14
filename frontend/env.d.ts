/// <reference types="vite/client" />

declare module 'vue' {
  export * from '@vue/runtime-dom'
}

declare global {
  const defineProps: (typeof import('vue'))['defineProps']
  const withDefaults: (typeof import('vue'))['withDefaults']
}
