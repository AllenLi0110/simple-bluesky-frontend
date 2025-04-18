import { ref, computed } from 'vue'
import { usePostStore } from '../../stores/posts'
import { useAuthStore } from '../../stores/auths'
import { useFeedStore } from '../../stores/feeds'
import { PostCollection } from '../../definitions'

export function usePostComposer() {
  const CHARACTER_LIMIT = 300

  const postText = ref('')
  const isPosting = ref(false)
  const location = ref<{ lat: number; lng: number } | null>(null)

  const remainingChars = computed(() => CHARACTER_LIMIT - postText.value.length)
  const isNearLimit = computed(() => remainingChars.value <= 20)
  const canPost = computed(() => postText.value.trim().length > 0 && !isPosting.value)

  const postStore = usePostStore()
  const authStore = useAuthStore()
  const feedStore = useFeedStore()

  const getCurrentLocation = (): Promise<{ lat: number; lng: number }> =>
    new Promise((resolve, reject) => {
      if (!navigator.geolocation) return reject(new Error('Geolocation not supported'))
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => resolve({ lat: coords.latitude, lng: coords.longitude }),
        reject
      )
    })

  const createPost = async () => {
    if (!postText.value.trim()) return
    isPosting.value = true
    location.value = null

    try {
      location.value = await getCurrentLocation()
      const record = {
        $type: PostCollection.AppBskyFeedPost,
        text: postText.value,
        langs: ['en'],
        createdAt: new Date().toISOString(),
        ...(location.value && {
          location: {
            latitude: location.value.lat,
            longitude: location.value.lng,
          },
        }),
      }

      const postData = {
        repo: authStore.did,
        collection: PostCollection.AppBskyFeedPost,
        validate: true,
        record,
      }

      await postStore.createPost(postData)
      postText.value = ''
      await feedStore.listFeeds({ actor: authStore.did, limit: 10 })
    } catch (err) {
      console.error('Post failed:', err)
    } finally {
      isPosting.value = false
    }
  }

  return {
    CHARACTER_LIMIT,
    postText,
    isPosting,
    remainingChars,
    isNearLimit,
    canPost,
    createPost,
  }
}
