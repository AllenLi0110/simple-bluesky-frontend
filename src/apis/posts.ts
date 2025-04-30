import api from './config'
import type {
  CreatePostRequest,
  CreatePostResponse,
  DeletePostRequest,
  DeletePostResponse,
} from '../definitions'
import { useAuthStore } from '../stores/auths'

export const postApi = {
  async createPost(payload: CreatePostRequest): Promise<CreatePostResponse> {
    const authStore = useAuthStore()
    const { data } = await api.post(`/dids/${authStore.did}/posts`, payload)
    return data.data
  },
  async deletePost(payload: DeletePostRequest): Promise<DeletePostResponse> {
    const authStore = useAuthStore()
    const { data } = await api.delete(`/dids/${authStore.did}/posts/${payload.rkey}`, {
      data: payload,
    })
    return data.data
  },
}
