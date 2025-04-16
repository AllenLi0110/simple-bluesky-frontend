import { postApi } from '../apis/post'
import { defineStore } from 'pinia'
import type { PostRequest, PostState } from '../definitions'

export const usePostStore = defineStore('post', {
  state: (): PostState => ({
    posts: {},
  }),
  getters: {},
  actions: {
    async post(payload: PostRequest) {
      try {
        const data = await postApi.post(payload)
        const rkey = data.uri.split('/').pop()
        if (rkey) {
          this.posts[rkey] = data
        }
        return data
      } catch (error) {
        console.error('Post Failed:', error)
      }
    },
  },
})
