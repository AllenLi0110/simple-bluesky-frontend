import axios from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL || '/api'
const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      console.warn('Session expired or unauthorized')
    }
    return Promise.reject(error)
  }
)

export default api
