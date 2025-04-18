import { postApi } from '../apis/posts'
import { defineStore } from 'pinia'
import type { CreatePostRequest, PostState } from '../definitions'

export const usePostStore = defineStore('post', {
  state: (): PostState => ({
    posts: {},
  }),
  getters: {},
  actions: {
    async createPost(payload: CreatePostRequest) {
      try {
        const data = await postApi.createPost(payload)
        const rkey = data.uri.split('/').pop()
        if (rkey) {
          this.posts[rkey] = data
        }
        return data
      } catch (error) {
        console.error('CreatePost Failed:', error)
      }
    },
  },
})
