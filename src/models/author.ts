export interface Author {
  did: string
  handle: string
  displayName: string
  avatar: string
  viewer: {
    muted: boolean
    blockedBy: boolean
  }
  labels: string[]
  createdAt: string
}
