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
        <n-text :type="isNearLimit ? 'error' : 'depth'">
          {{ remainingChars }} characters remaining
        </n-text>
        <div class="post-actions">
          <n-button @click="createPost" type="primary" :disabled="!canPost" :loading="isPosting">
            {{ isPosting ? 'Posting...' : 'Post' }}
          </n-button>
        </div>
      </div>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { usePostComposer } from '../../composables/posts/posts'

const { CHARACTER_LIMIT, postText, isPosting, remainingChars, isNearLimit, canPost, createPost } =
  usePostComposer()
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
