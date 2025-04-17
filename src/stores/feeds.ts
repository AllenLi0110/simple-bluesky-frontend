import { feedApi } from '../apis/feeds'
import { defineStore } from 'pinia'
import type { ListFeedsRequest, FeedState } from '../definitions'

export const useFeedStore = defineStore('feed', {
  state: (): FeedState => ({
    feeds: {},
  }),
  getters: {},
  actions: {
    async listFeeds(payload: ListFeedsRequest) {
      try {
        const data = await feedApi.listFeeds(payload)
        this.feeds = data
        return data
      } catch (error) {
        console.error('ListFeeds Failed:', error)
      }
    },
  },
})
