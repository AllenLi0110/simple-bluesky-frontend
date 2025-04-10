import type { DidDoc } from '../models/did-doc'

export interface AuthState {
  isAuthenticated: boolean
  token: string | null
}

export interface SignInRequest {
  identifier: string
  password: string
}

export interface SignInResponse {
  did: string
  didDoc?: DidDoc
  handle: string
  email?: string
  emailConfirmed?: boolean
  emailAuthFactor?: boolean
  accessJwt: string
  refreshJwt: string
  active?: boolean
}
