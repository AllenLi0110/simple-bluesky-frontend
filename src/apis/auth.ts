import api from './config'
import type { SignInRequest, SignInResponse } from '../definitions/auth'

export const authApi = {
  async signIn({ identifier, password }: SignInRequest): Promise<SignInResponse> {
    const { data } = await api.post('/authentications/sign-in', {
      identifier,
      password,
    })
    const {
      did,
      didDoc,
      handle,
      email,
      emailConfirmed,
      emailAuthFactor,
      accessJwt,
      refreshJwt,
      active,
    } = data.data
    return {
      did,
      didDoc,
      handle,
      email,
      emailConfirmed,
      emailAuthFactor,
      accessJwt,
      refreshJwt,
      active,
    }
  },
}
