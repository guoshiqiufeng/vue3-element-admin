import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { HQRequestInterceptors, HQRequestConfig } from './type'

import { ElLoading, ElMessage } from 'element-plus'

import localCache from '@/utils/cache'

const DEFAULT_LOADING = true
class HQRequest {
  instance: AxiosInstance
  interceptors?: HQRequestInterceptors
  showLoading: boolean
  loading?: any
  constructor(config: HQRequestConfig) {
    this.instance = axios.create(config)
    this.showLoading = config.showLoading ?? true
    this.interceptors = config.interceptors
    // interceptors request
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    // interceptors response
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )
    this.instance.interceptors.request.use(
      config => {
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '拼命加载中...',
            background: 'rgba(255,255,255,0.5)'
          })
        }
        return config
      },
      error => {
        return error
      }
    )
    this.instance.interceptors.response.use(
      res => {
        this.loading?.close()
        if (res.data && res.data.code === 21102) {
          localCache.setCache('token', res.headers.authorization)
          const backoff = new Promise(resolve => {
            setTimeout(function () {
              resolve(res)
            }, 1)
          })
          // 重新发起axios请求
          return backoff.then(() => this.instance.request(res.config))
        } else if (res.data && res.data.code !== 20000) {
          ElMessage.error(res.data.message)
        }
        return res.data
      },
      error => {
        this.loading?.close()
        return error
      }
    )
  }
  request<T>(config: HQRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // config
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }
      // showLoading
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }
      this.instance
        .request<any, T>(config)
        .then(res => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          this.showLoading = DEFAULT_LOADING

          resolve(res)
        })
        .catch(error => {
          this.showLoading = DEFAULT_LOADING
          reject(error)
          return error
        })
    })
  }

  get<T>(config: HQRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T>(config: HQRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  put<T>(config: HQRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PUT' })
  }

  delete<T>(config: HQRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T>(config: HQRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}
export default HQRequest
