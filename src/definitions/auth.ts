import type { DidDoc } from '../models/'

export interface AuthState {
  isAuthenticated: boolean
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

export interface StatusResponse {
  authenticated: boolean
}
