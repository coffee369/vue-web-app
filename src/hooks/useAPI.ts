import { useAuthStore } from '@/stores/auth'
import axios, { type AxiosRequestConfig } from 'axios'

const API_URL = import.meta.env.VITE_API_URL || ''

interface FetchOption {
  url: string
  method?: AxiosRequestConfig['method']
  data?: AxiosRequestConfig['data']
  params?: AxiosRequestConfig['params']
}

const useAPI = ({ url, method = 'GET', data, params }: FetchOption) => {
  const authStore = useAuthStore()
  axios.interceptors.request.use((config: AxiosRequestConfig) => {
    /**
     * Add the user token
     */
    const getToken = authStore.access_token
    if (!config.headers || !getToken) {
      return config
    }

    config.headers.Authorization = `Bearer ${getToken}`

    return config
  })

  return axios({
    url: `${API_URL + url}`,
    method,
    data,
    params,
  })
}

export default useAPI
