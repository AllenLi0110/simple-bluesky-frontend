import { authApi } from '../apis/auth'
import { defineStore } from 'pinia'
import type { AuthState } from '../definitions'

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    isAuthenticated: false,
  }),
  getters: {
    isSignedIn: state => state.isAuthenticated,
  },
  actions: {
    async signIn(identifier: string, password: string) {
      try {
        const { accessJwt } = await authApi.signIn({ identifier, password })
        if (accessJwt) {
          this.isAuthenticated = true
        }
        return { success: true }
      } catch (error) {
        console.error('Sign In Failed:', error)
        return { success: false, error }
      }
    },
    async signOut() {
      try {
        await authApi.signOut()
        this.isAuthenticated = false
      } catch (error) {
        console.error('Sign Out Failed:', error)
      }
    },
  },
})
