import { postApi } from '../apis/posts'
import { defineStore } from 'pinia'
import type { CreatePostRequest, DeletePostRequest, PostState } from '../definitions'

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
    async deletePost(payload: DeletePostRequest) {
      try {
        const data = await postApi.deletePost(payload)
        if (data.commit) {
          delete this.posts[payload.rkey]
        }
        return data
      } catch (error) {
        console.error('DeletePost Failed:', error)
      }
    },
  },
})
