import type { Post } from '../models'

export interface FeedState {
  feeds: Record<string, any>
}
export interface ListFeedsRequest {
  actor: string
  limit?: number
  cursor?: string
  filter?: AppBskyFeedGetAuthorFeedFilter
  includePins?: boolean
}

export interface ListFeedsResponse {
  feed: Post[]
}

export enum AppBskyFeedGetAuthorFeedFilter {
  PostsWithReplies = 'posts_with_replies',
  PostsNoReplies = 'posts_no_replies',
  PostsWithMedia = 'posts_with_media',
  PostsAndAuthorThreads = 'posts_and_author_threads',
  PostsWithVideo = 'posts_with_video',
}
