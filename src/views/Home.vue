<template>
  <div class="home">
    <h1>Welcome to Bluesky</h1>
    <CreatePostView></CreatePostView>
    <ListFeedsView></ListFeedsView>
  </div>
</template>

<script setup lang="ts">
import CreatePostView from '@/components/posts/CreatePostView.vue'
import ListFeedsView from '@/components/feeds/ListFeedsView.vue'
</script>

<style scoped>
.home {
  padding: 20px;
}
</style>
