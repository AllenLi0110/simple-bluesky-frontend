import { postApi } from '../apis/post'
import { defineStore } from 'pinia'
import type { PostRequest } from '../definitions'

interface PostState {}

export const usePostStore = defineStore('post', {
  state: (): PostState => ({}),
  getters: {},
  actions: {
    async post({ repo, collection, validate, record, swapCommit }: PostRequest) {
      try {
        await postApi.post({
          repo,
          collection,
          validate,
          record,
          swapCommit,
        })
      } catch (error) {
        console.error('Post Failed:', error)
      }
    },
  },
})
