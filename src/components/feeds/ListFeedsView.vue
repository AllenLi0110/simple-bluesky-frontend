<template>
  <div class="feed-list">
    <n-spin :show="loading" style="width: 100%">
      <n-list v-if="!loading && feeds?.feed">
        <n-list-item v-for="item in feeds?.feed" :key="item.post.uri">
          <n-thing>
            <template #header>
              <n-space justify="space-between" align="center">
                <n-text strong>{{ item.post.author.handle }}</n-text>
              </n-space>
            </template>
            <template #description>
              <n-text>{{ item.post.record.text }}</n-text>
              <n-space
                v-if="item.post.record.embed?.$type === EmbedType.Images"
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
              <n-space align="center" style="margin-top: 8px" :size="16">
                <n-text depth="3">{{ formatDate(item.post.record.createdAt) }}</n-text>
                <div v-if="item.post.record.location">
                  <n-text depth="3"> 📍 {{ locationMap[item.post.uri] }} </n-text>
                </div>
                <n-popover trigger="click">
                  <template #trigger>
                    <n-button text>
                      <n-icon><ellipsis-horizontal /></n-icon>
                    </n-button>
                  </template>
                  <n-space vertical>
                    <n-button text type="error" @click="showDeleteDialog(item.post.uri)">
                      Delete post
                    </n-button>
                  </n-space>
                </n-popover>
              </n-space>
            </template>
          </n-thing>
        </n-list-item>
      </n-list>
    </n-spin>

    <n-modal v-model:show="showDeleteConfirm" preset="dialog">
      <template #header>
        <div>Delete this post?</div>
      </template>
      <div>If you remove this post, you won't be able to recover it.</div>
      <template #action>
        <n-space>
          <n-button @click="showDeleteConfirm = false">Cancel</n-button>
          <n-button type="error" @click="handleDelete">Delete</n-button>
        </n-space>
      </template>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import {
  NList,
  NListItem,
  NThing,
  NText,
  NSpace,
  NImage,
  NImageGroup,
  NSpin,
  NButton,
  NPopover,
  NModal,
  NIcon,
} from 'naive-ui'
import { formatDate } from '../../composables/feeds/feeds'
import { getBlobUrl } from '../../utils/get-blob-url'
import { EmbedType } from '../../definitions'
import { EllipsisHorizontal } from '@vicons/ionicons5'
import { useListFeeds } from '../../composables/feeds/list-feeds'
import { onMounted } from 'vue'

const {
  feeds,
  loading,
  locationMap,
  showDeleteConfirm,
  showDeleteDialog,
  handleDelete,
  refreshFeeds,
} = useListFeeds()

onMounted(() => {
  refreshFeeds()
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
