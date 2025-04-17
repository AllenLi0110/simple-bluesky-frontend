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
            <br />
            <n-text depth="3">{{ formatDate(item.post.record.createdAt) }}</n-text>
          </template>
        </n-thing>
      </n-list-item>
    </n-list>
  </div>
</template>

<script setup lang="ts">
import { NList, NListItem, NThing, NText } from 'naive-ui'
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
</style>
