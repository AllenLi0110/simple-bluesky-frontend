import { ref, watchEffect } from 'vue'
import { usePostStore } from '../../stores/posts'
import { useAuthStore } from '../../stores/auths'
import { useFeedStore } from '../../stores/feeds'
import { AtProtoPost } from '../../definitions'
import { useFeed } from './feeds'

export function useListFeeds() {
  const postStore = usePostStore()
  const authStore = useAuthStore()
  const feedStore = useFeedStore()
  const { feeds, locationMap } = useFeed()
  const loading = ref(true)
  const showDeleteConfirm = ref(false)
  const postToDelete = ref('')

  const showDeleteDialog = (uri: string) => {
    postToDelete.value = uri
    showDeleteConfirm.value = true
  }

  const refreshFeeds = async (limit = 10) => {
    loading.value = true
    await feedStore.listFeeds({ actor: authStore.did, limit })
  }

  const handleDelete = async () => {
    showDeleteConfirm.value = false
    const post = feeds.value?.feed?.find(
      (item: { post: { uri: string } }) => item.post.uri === postToDelete.value
    )
    if (post) {
      await postStore.deletePost({
        repo: post.post.author.did,
        collection: AtProtoPost.AppBskyFeedPost,
        rkey: post.post.uri.split('/').pop() || '',
      })
      await refreshFeeds()
    }
  }

  watchEffect(() => {
    if (feeds.value && feeds.value.feed) {
      loading.value = false
    }
  })

  return {
    feeds,
    loading,
    locationMap,
    showDeleteConfirm,
    showDeleteDialog,
    handleDelete,
    refreshFeeds,
  }
}
