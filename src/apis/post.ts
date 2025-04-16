import api from './config'
import type { PostRequest, PostResponse } from '../definitions'
import { useAuthStore } from '../stores/auth'

export const postApi = {
  async post(payload: PostRequest): Promise<PostResponse> {
    const authStore = useAuthStore()
    const { data } = await api.post(`/did/${authStore.did}/posts`, payload)
    return data.data
  },
}
