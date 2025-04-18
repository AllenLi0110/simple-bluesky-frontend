<template>
  <div class="feed-list">
    <n-list>
      <n-list-item v-for="item in feeds?.feed" :key="item.post.uri">
        <n-thing>
          <template #header>
            <n-text strong>{{ item.post.author.handle }}</n-text>
          </template>
          <template #description>
            <n-text>{{ item.post.record.text }}</n-text>
            <n-space
              v-if="item.post.record.embed?.$type === 'app.bsky.embed.images'"
              :wrap="true"
              :size="12"
              class="image-container"
            >
              <n-image-group>
                <n-image
                  v-for="(image, index) in item.post.record.embed.images"
                  :key="index"
                  :src="getBlobUrl(image.image.ref.$link)"
                  :alt="image.alt"
                  :width="item.post.record.embed.images.length > 1 ? 360 : 600"
                  object-fit="cover"
                  preview-disabled
                  class="post-image"
                  :style="{
                    aspectRatio: `${image.aspectRatio?.width || 1} / ${image.aspectRatio?.height || 1}`,
                    maxHeight: '600px',
                  }"
                />
              </n-image-group>
            </n-space>
            <br />
            <n-text depth="3">{{ formatDate(item.post.record.createdAt) }}</n-text>
          </template>
        </n-thing>
      </n-list-item>
    </n-list>
  </div>
</template>

<script setup lang="ts">
import { NList, NListItem, NThing, NText, NSpace, NImage, NImageGroup } from 'naive-ui'
import { storeToRefs } from 'pinia'
import { useFeedStore } from '../../stores/feeds'
import { useAuthStore } from '../../stores/auths'
import { onMounted } from 'vue'

const feedStore = useFeedStore()
const authStore = useAuthStore()
const { feeds } = storeToRefs(feedStore)

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString()
}

const getBlobUrl = (link: string) => {
  return `https://bsky.social/xrpc/com.atproto.sync.getBlob?did=${authStore.did}&cid=${link}`
}

onMounted(async () => {
  await feedStore.listFeeds({
    actor: authStore.did,
    limit: 10,
  })
})
</script>

<style scoped>
.feed-list {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.image-container {
  margin: 12px 0;
}

.post-image {
  border-radius: 8px;
}
</style>
