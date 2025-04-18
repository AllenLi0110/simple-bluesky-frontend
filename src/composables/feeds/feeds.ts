import { ref } from 'vue'
import { getAddressFromCoordinates } from '../../utils/get-address'
import { useFeedStore } from '../../stores/feeds'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '../../stores/auths'

export const useLocationMap = () => {
  const locationMap = ref<{ [key: string]: string }>({})

  const updateLocations = async (feeds: any[]) => {
    const feedItems = feeds ?? []
    for (const item of feedItems) {
      const { location } = item.post.record
      if (location) {
        const { latitude, longitude } = location
        const address = await getAddressFromCoordinates(latitude, longitude)
        locationMap.value[item.post.uri] = address
      }
    }
  }

  return { locationMap, updateLocations }
}

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString()
}

export const useFeed = () => {
  const feedStore = useFeedStore()
  const authStore = useAuthStore()
  const { feeds } = storeToRefs(feedStore)

  const { locationMap, updateLocations } = useLocationMap()

  onMounted(async () => {
    await feedStore.listFeeds({
      actor: authStore.did,
      limit: 10,
    })
  })

  watch(
    () => feeds.value?.feed,
    async newFeeds => {
      if (newFeeds) {
        await updateLocations(newFeeds)
      }
    },
    { deep: true }
  )

  return { feeds, locationMap }
}
