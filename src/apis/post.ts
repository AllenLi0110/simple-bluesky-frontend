import api from './config'
import type { PostRequest, PostResponse } from '../definitions'
import { useAuthStore } from '../stores/auth'

export const postApi = {
  async post({
    repo,
    collection,
    validate,
    record,
    swapCommit,
  }: PostRequest): Promise<PostResponse> {
    const authStore = useAuthStore()
    const { data } = await api.post(`/did/${authStore.did}/posts`, {
      repo,
      collection,
      validate,
      record,
      swapCommit,
    })
    return data.data
  },
}
