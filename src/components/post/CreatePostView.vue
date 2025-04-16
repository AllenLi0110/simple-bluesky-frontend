<template>
  <div class="create-post">
    <div class="post-input-container">
      <textarea
        v-model="postText"
        class="post-input"
        placeholder="What's up?"
        rows="4"
        :maxlength="CHARACTER_LIMIT"
      />
      <div class="post-info">
        <span class="character-count" :class="{ 'near-limit': remainingChars <= 20 }">
          {{ remainingChars }} characters remaining
        </span>
        <div class="post-actions">
          <button @click="createPost" class="post-button" :disabled="!postText.trim() || isPosting">
            {{ isPosting ? 'Posting...' : 'Post' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { usePostStore } from '../../stores/post'
import { useAuthStore } from '../../stores/auth'
import { PostCollection } from '../../definitions'

const CHARACTER_LIMIT = 300
const postStore = usePostStore()
const authStore = useAuthStore()
const postText = ref('')
const isPosting = ref(false)

const remainingChars = computed(() => {
  return CHARACTER_LIMIT - postText.value.length
})

const createPost = async () => {
  if (!postText.value.trim()) return
  isPosting.value = true
  try {
    await postStore.post({
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
  max-width: 600px;
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
}

.character-count {
  color: #536471;
  font-size: 0.9rem;
}

.character-count.near-limit {
  color: #ff4b4b;
}

.post-actions {
  margin-left: 1rem;
}

.post-button {
  padding: 0.5rem 1.5rem;
  background-color: #1da1f2;
  color: white;
  border: none;
  border-radius: 9999px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.2s;
}

.post-button:hover:not(:disabled) {
  background-color: #1a91da;
}

.post-button:disabled {
  background-color: #9fd0f5;
  cursor: not-allowed;
}
</style>
