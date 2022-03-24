import HQRequest from '@/service/request'
import { ElMessage } from 'element-plus'
import { BASE_URL, TIME_OUT } from './request/config'
import localCache from '@/utils/cache'
import router from '@/router'
const hqRequest = new HQRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config: any) => {
      const token = localCache.getCache('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    requestInterceptorCatch: error => {
      return error
    },
    responseInterceptor: res => {
      if (res.data && res.data.code === 21101) {
        // 登录失效
        localCache.deleteCache('token')
        ElMessage.error(res.data.message)
        router.push('/login')
      }
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
