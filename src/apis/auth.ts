import api from './config'
import type { SignInRequest, SignInResponse } from '../definitions'

export const authApi = {
  async signIn({ identifier, password }: SignInRequest): Promise<SignInResponse> {
    const { data } = await api.post('/authentications/sign-in', {
      identifier,
      password,
    })
    return data.data
  },
}
