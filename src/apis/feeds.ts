import api from './config'
import type { ListFeedsRequest, ListFeedsResponse } from '../definitions'
import { useAuthStore } from '../stores/auths'

export const feedApi = {
  async listFeeds(payload: ListFeedsRequest): Promise<ListFeedsResponse> {
    const authStore = useAuthStore()
    const { data } = await api.get(`/dids/${authStore.did}/feeds`, {
      params: payload,
    })
    return data.data
  },
}
