import type { EmbedType, FeatureType } from '../definitions'

export interface AppBskyFeedPostRecord {
  $type: string
  /** The primary post content. May be an empty string, if there are embeds. */
  text: string
  /** DEPRECATED: replaced by app.bsky.richtext.facet. */
  entities?: Entity[]
  /** Annotations of text (mentions, URLs, hashtags, etc) */
  facets?: AppBskyRichtextFacetMain[]
  reply?: ReplyRef
  embed?:
    | AppBskyEmbedImagesMain
    | AppBskyEmbedVideoMain
    | AppBskyEmbedExternalMain
    | AppBskyEmbedRecordMain
    | AppBskyEmbedRecordWithMediaMain
    | { $type: string }
  /** Indicates human language of post primary text content. */
  langs?: string[]
  labels?: ComAtprotoLabelDefsSelfLabels | { $type: string }
  /** Additional hashtags, in addition to any included in post text and facets. */
  tags?: string[]
  /** Client-declared timestamp when this post was originally created. */
  createdAt: string
  /** Customer object with geographical coordinates. */
  location?: {
    latitude: number
    longitude: number
  }
  [k: string]: unknown
}

export interface Entity {
  // $type?: 'app.bsky.feed.post#entity'
  $type?: string
  index: TextSlice
  /** Expected values are 'mention' and 'link'. */
  type: string
  value: string
}
/** Deprecated. Use app.bsky.richtext instead -- A text segment. Start is inclusive, end is exclusive. Indices are for utf16-encoded strings. */
export interface TextSlice {
  // $type?: 'app.bsky.feed.post#textSlice'
  $type?: string
  start: number
  end: number
}

export interface AppBskyRichtextFacetMain {
  // $type?: 'app.bsky.richtext.facet'
  $type?: string
  index: ByteSlice
  features: Feature[]
}

/** Specifies the sub-string range a facet feature applies to. Start index is inclusive, end index is exclusive. Indices are zero-indexed, counting bytes of the UTF-8 encoded text. NOTE: some languages, like Javascript, use UTF-16 or Unicode codepoints for string slice indexing; in these languages, convert to byte arrays before working with facets. */
export interface ByteSlice {
  // $type?: 'app.bsky.richtext.facet#byteSlice'
  $type?: string
  byteStart: number
  byteEnd: number
}

export interface Mention {
  type: FeatureType.Mention
  index: ByteSlice
  did: string
}
export interface Link {
  type: FeatureType.Link
  index: ByteSlice
  uri: string
}
export interface Tag {
  type: FeatureType.Tag
  index: ByteSlice
  tag: string
}
export type Feature = Mention | Link | Tag

export interface ReplyRef {
  // $type?: 'app.bsky.feed.post#replyRef'
  $type?: string
  root: ComAtprotoRepoStrongRefMain
  parent: ComAtprotoRepoStrongRefMain
}
export interface ComAtprotoRepoStrongRefMain {
  // $type?: 'com.atproto.repo.strongRef'
  $type?: string
  uri: string
  cid: string
}
export interface ComAtprotoRepoStrongRefMain {
  // $type?: 'com.atproto.repo.strongRef'
  $type?: string
  uri: string
  cid: string
}

export interface AppBskyEmbedImagesMain {
  $type: EmbedType.Images
  images: Image[]
}
export interface AppBskyEmbedVideoMain {
  $type: EmbedType.Video
  video: BlobRef
  captions?: Caption[]
  alt?: string
  aspectRatio?: AppBskyEmbedDefsAspectRatio
}
export interface AppBskyEmbedExternalMain {
  $type: EmbedType.External
  external: {
    uri: string
    title: string
    description: string
    thumb?: BlobRef
  }
}
export interface AppBskyEmbedRecordMain {
  $type: EmbedType.Record
  record: ComAtprotoRepoStrongRefMain
}
export interface AppBskyEmbedRecordWithMediaMain {
  $type: EmbedType.RecordWithMedia
  record: AppBskyEmbedRecordMain
  media: AppBskyEmbedImagesMain | AppBskyEmbedVideoMain | AppBskyEmbedExternalMain
}

export interface Image {
  // $type?: 'app.bsky.embed.images#image'
  $type?: string
  image: BlobRef
  /** Alt text description of the image, for accessibility. */
  alt: string
  aspectRatio?: AppBskyEmbedDefsAspectRatio
}
export interface AppBskyEmbedDefsAspectRatio {
  // $type?: 'app.bsky.embed.defs#aspectRatio'
  $type?: string
  width: number
  height: number
}
export interface BlobRef {
  // $type: 'blob'
  $type: string
  ref: string
  mimeType: string
  size: number
}
export interface Caption {
  // $type?: 'app.bsky.embed.video#caption'
  $type?: string
  lang: string
  file: BlobRef
}

export interface ComAtprotoRepoStrongRefMain {
  // $type?: 'com.atproto.repo.strongRef'
  $type?: string
  uri: string
  cid: string
}

export interface ComAtprotoLabelDefsSelfLabels {
  // $type?: 'com.atproto.label.defs#selfLabels'
  $type?: string
  values: SelfLabel[]
}
/** Metadata tag on an atproto record, published by the author within the record. Note that schemas should use #selfLabels, not #selfLabel. */
export interface SelfLabel {
  $type?: 'com.atproto.label.defs#selfLabel'
  /** The short string name of the value or type of this label. */
  val: string
}
