import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface HQRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (config: T) => T
  responseInterceptorCatch?: (error: any) => any
}

/**
 * 请求配置
 */
export interface HQRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  /**
   * 拦截器
   */
  interceptors?: HQRequestInterceptors<T>
  /**
   * 是否显示loading
   */
  showLoading?: boolean
}
