import router from '@/router'
import { useAuthStore } from '@/stores/auth.store'
import { createFetch } from '@vueuse/core'
export const useApiFetch = createFetch({
  baseUrl: import.meta.env.VITE_API_URL,
  options: {
    async beforeFetch({ options }) {
      const auth = useAuthStore()
      if (auth.token) {
        options.headers = { ...options.headers, Authorization: `Bearer ${auth.token}` }
      }
      return { options }
    },
    async onFetchError(ctx) {
      if (ctx.response?.status === 401) {
        const auth = useAuthStore()
        const isMockToken = auth.token.startsWith('mock.')
        if (isMockToken) {
          return ctx
        }
        auth.logout()
        router.push('/login')
      }
      return ctx
    },
  },
})
