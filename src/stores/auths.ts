import { authApi } from '../apis/auths'
import { defineStore } from 'pinia'
import type { AuthState, SignInRequest } from '../definitions'

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    isAuthenticated: false,
    did: '',
  }),
  getters: {
    isSignedIn: state => state.isAuthenticated,
    getDid: state => state.did,
  },
  actions: {
    async signIn(payload: SignInRequest) {
      try {
        const { accessJwt, refreshJwt, did, handle } = await authApi.signIn(payload)
        if (accessJwt && refreshJwt && did && handle) {
          this.isAuthenticated = true
          this.did = did
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
        this.did = ''
      } catch (error) {
        console.error('Sign Out Failed:', error)
      }
    },
    async status() {
      try {
        const { authenticated, did } = await authApi.status()
        this.isAuthenticated = authenticated
        this.did = did
      } catch {
        this.isAuthenticated = false
        this.did = ''
      }
      return this.isAuthenticated
    },
  },
})
