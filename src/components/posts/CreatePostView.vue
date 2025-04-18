<template>
  <div class="create-post">
    <n-card class="post-input-container">
      <n-input
        v-model:value="postText"
        type="textarea"
        placeholder="What's up?"
        :rows="1"
        :maxlength="CHARACTER_LIMIT"
      />
      <div class="post-info">
        <n-text :type="remainingChars <= 20 ? 'error' : 'depth'">
          {{ remainingChars }} characters remaining
        </n-text>
        <div class="post-actions">
          <n-button
            @click="createPost"
            type="primary"
            :disabled="!postText.trim() || isPosting"
            :loading="isPosting"
          >
            {{ isPosting ? 'Posting...' : 'Post' }}
          </n-button>
        </div>
      </div>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { NCard, NInput, NButton, NText } from 'naive-ui'
import { usePostStore } from '../../stores/posts'
import { useAuthStore } from '../../stores/auths'
import { useFeedStore } from '../../stores/feeds'
import { PostCollection } from '../../definitions'

const CHARACTER_LIMIT = 300
const postStore = usePostStore()
const authStore = useAuthStore()
const feedStore = useFeedStore()
const postText = ref('')
const isPosting = ref(false)

const remainingChars = computed(() => {
  return CHARACTER_LIMIT - postText.value.length
})

const createPost = async () => {
  if (!postText.value.trim()) return
  isPosting.value = true
  try {
    await postStore.createPost({
      repo: authStore.did,
      collection: PostCollection.AppBskyFeedPost,
      validate: true,
      record: {
        $type: PostCollection.AppBskyFeedPost,
        text: postText.value,
        langs: ['en'],
        createdAt: new Date().toISOString(),
      },
    })
    postText.value = ''
    await feedStore.listFeeds({
      actor: authStore.did,
      limit: 10,
    })
  } catch (error) {
    console.error('Failed to create post:', error)
  } finally {
    isPosting.value = false
  }
}
</script>

<style scoped>
.create-post {
  padding: 1rem;
  max-width: 800px;
  margin: 0 auto;
}

.post-input-container {
  background-color: white;
  border-radius: 12px;
  border: 1px solid #e1e8ed;
  padding: 1rem;
}

.post-input {
  width: 100%;
  border: none;
  resize: none;
  font-size: 1.1rem;
  margin-bottom: 1rem;
  outline: none;
  font-family: inherit;
}

.post-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
}

.post-actions {
  margin-left: 1rem;
}
</style>
