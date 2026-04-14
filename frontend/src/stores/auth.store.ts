import { authService } from '@/services/auth.service'
import { useViewAsStore } from '@/stores/view-as.store'
import type { LoginPayload, User } from '@/types/auth'
import { defineStore } from 'pinia'

const TOKEN_KEY = 'omni-vital:token'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem(TOKEN_KEY) || '',
    user: null as User | null,
    loading: false,
  }),
  getters: {
    isAuthenticated: (state) => Boolean(state.token),
  },
  actions: {
    async login(payload: LoginPayload) {
      this.loading = true
      const viewAs = useViewAsStore()

      try {
        const response = await authService.login(payload)
        const profile = await authService.me(response.access_token)

        this.token = response.access_token
        this.user = profile
        localStorage.setItem(TOKEN_KEY, response.access_token)
        viewAs.initializeForRole(profile.role)
      } catch (error) {
        this.logout()
        throw error
      } finally {
        this.loading = false
      }
    },
    async loadCurrentUser() {
      if (!this.token) return
      const viewAs = useViewAsStore()
      this.user = await authService.me(this.token)
      viewAs.initializeForRole(this.user.role)
    },
    logout() {
      this.token = ''
      this.user = null
      localStorage.removeItem(TOKEN_KEY)
    },
  },
})
