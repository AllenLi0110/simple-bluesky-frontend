export interface DidDoc {
  '@context': string[]
  id: string
  alsoKnownAs: string[]
  verificationMethod: {
    id: string
    type: string
    controller: string
    publicKeyMultibase: string
  }[]
  service: {
    id: string
    type: string
    serviceEndpoint: string
  }[]
}
