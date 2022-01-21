import HQRequest from '@/service/request'
import { ElMessage } from 'element-plus'
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
      console.log(res)
      return res
    },
    responseInterceptorCatch: error => {
      if (error && error.stack.indexOf('timeout') > -1) {
        ElMessage.error('请求超时!')
      }
      if (error && error.stack.indexOf('Network Error') > -1) {
        ElMessage.error('连接服务器失败!')
      }
      return error
    }
  }
})
export default hqRequest
