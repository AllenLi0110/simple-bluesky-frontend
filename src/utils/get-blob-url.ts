import { useAuthStore } from '../stores/auths'

export const getBlobUrl = (link: string) => {
  const authStore = useAuthStore()
  return `https://bsky.social/xrpc/com.atproto.sync.getBlob?did=${authStore.did}&cid=${link}`
}
