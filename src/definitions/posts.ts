import type { AppBskyFeedPostRecord } from '../models/record'

export interface PostState {
  posts: Record<string, any>
}
export interface CreatePostRequest {
  repo: string
  collection: string
  rkey?: string
  validate?: boolean
  record: AppBskyFeedPostRecord
  swapCommit?: string
}
export interface CreatePostResponse {
  uri: string
  cid: string
  commit: Commit
  validationStatus: string
}
interface Commit {
  cid: string
  rev: string
}

export enum FeatureType {
  Mention = 'app.bsky.richtext.facet#mention',
  Link = 'app.bsky.richtext.facet#link',
  Tag = 'app.bsky.richtext.facet#tag',
}
export enum EmbedType {
  Images = 'app.bsky.embed.images',
  Video = 'app.bsky.embed.video',
  External = 'app.bsky.embed.external',
  Record = 'app.bsky.embed.record',
  RecordWithMedia = 'app.bsky.embed.recordWithMedia',
}

export enum AtProtoPost {
  AppBskyFeedPost = 'app.bsky.feed.post',
}

export interface DeletePostRequest {
  repo: string
  collection: string
  rkey: string
}
export interface DeletePostResponse {
  commit?: Commit
}
