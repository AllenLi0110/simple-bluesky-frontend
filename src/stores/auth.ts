import { defineStore } from 'pinia'
import { authApi } from '../apis/auth'
import type { AuthState } from '../definitions/auth'

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    isAuthenticated: false,
    token: null,
  }),
  getters: {
    isSignedIn: state => state.isAuthenticated,
  },
  actions: {
    async signIn(identifier: string, password: string) {
      try {
        const { accessJwt } = await authApi.signIn({ identifier, password })
        this.token = accessJwt
        this.isAuthenticated = true
        localStorage.setItem('auth_token', accessJwt)
        return { success: true }
      } catch (error) {
        console.error('Sign In Failed:', error)
        return { success: false, error }
      }
    },
    async signOut() {
      this.token = null
      this.isAuthenticated = false
      localStorage.removeItem('auth_token')
    },
    async checkAuth() {
      const token = localStorage.getItem('auth_token')
      if (token) {
        try {
          this.token = token
          this.isAuthenticated = true
          return true
        } catch (error) {
          console.error('Auth check failed:', error)
          this.signOut()
          return false
        }
      }
      return false
    },
  },
})
