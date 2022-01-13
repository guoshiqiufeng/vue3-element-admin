import HQRequest from '@/service/request'
import { BASE_URL, TIME_OUT } from './request/config'
import localCache from '@/utils/cache'
const hqRequest = new HQRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: config => {
      const token = localCache.getCache('token')
      if (token) {
        ;(config as any).headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    requestInterceptorCatch: error => {
      return error
    },
    responseInterceptor: res => {
      return res
    },
    responseInterceptorCatch: error => {
      return error
    }
  }
})
export default hqRequest
