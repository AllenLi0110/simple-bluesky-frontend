import type { Author } from './author'

export interface Post {
  uri: string
  cid: string
  author: Author
  record: {
    $type: 'app.bsky.feed.post'
    createdAt: string
    text: string
  }
  replyCount: number
  repostCount: number
  likeCount: number
  quoteCount: number
  indexedAt: string
  viewer: {
    threadMuted: boolean
    embeddingDisabled: boolean
  }
  labels: string[]
}
