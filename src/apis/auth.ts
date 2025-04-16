import api from './config'
import type { SignInRequest, SignInResponse, StatusResponse } from '../definitions'

export const authApi = {
  async signIn(payload: SignInRequest): Promise<SignInResponse> {
    const { data } = await api.post('/authentications/sign-in', payload)
    return data.data
  },
  async signOut(): Promise<void> {
    await api.delete('./authentications/sign-out')
  },
  async status(): Promise<StatusResponse> {
    const { data } = await api.get('./authentications/status')
    return data.data
  },
}
