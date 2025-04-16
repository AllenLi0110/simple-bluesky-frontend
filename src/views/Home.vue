<template>
  <div class="home">
    <h1>Welcome to Bluesky</h1>
    <CreatePostView></CreatePostView>
  </div>
</template>

<script setup lang="ts">
import CreatePostView from '@/components/post/CreatePostView.vue'
</script>

<style scoped>
.home {
  padding: 20px;
}
</style>
