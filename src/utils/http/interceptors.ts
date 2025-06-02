import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios'
import { generateRequestId, isDevelopment } from './config'
import { createApiError } from './errors'
import { tokenManager } from './token'
import { ApiResponse, RequestConfig } from './types'

/**
 * 全局Headers管理
 */
let globalHeaders: Record<string, string> = {}

/**
 * 处理未授权
 */
const handleUnauthorized = async (): Promise<void> => {
  tokenManager.clearToken()
  console.log('用户未授权，需要重新登录')
  // 可以在这里触发登录页面跳转
}

/**
 * 设置请求拦截器
 */
export const setupRequestInterceptor = (instance: AxiosInstance): void => {
  instance.interceptors.request.use(
    (config) => {
      // 应用全局Headers
      Object.entries(globalHeaders).forEach(([key, value]) => {
        config.headers.set(key, value)
      })

      // 添加认证头
      const token = tokenManager.getToken()

      if (token && !(config as RequestConfig).skipAuth) {
        config.headers.Authorization = `Bearer ${token}`
      }

      // 添加请求ID和时间戳
      config.headers['X-Request-ID'] = generateRequestId()
      config.headers['X-Timestamp'] = Date.now().toString()

      // 开发环境日志
      if (isDevelopment()) {
        console.log('🚀 Request:', {
          method: config.method?.toUpperCase(),
          url: config.url,
          data: config.data,
          params: config.params,
        })
      }

      return config
    },
    (error) => {
      console.error('❌ Request Error:', error)
      return Promise.reject(createApiError.unknown('请求配置错误'))
    },
  )
}

/**
 * 设置响应拦截器
 */
export const setupResponseInterceptor = (instance: AxiosInstance): void => {
  instance.interceptors.response.use(
    (response: AxiosResponse<ApiResponse>) => {
      // 开发环境日志
      if (isDevelopment()) {
        console.log('✅ Response:', {
          status: response.status,
          url: response.config.url,
          data: response.data,
        })
      }

      // 检查业务状态码
      if (response.data && response.data.success === false) {
        throw createApiError.business(
          response.data.message || '业务处理失败',
          response.data.code,
        )
      }

      return response
    },
    async (error: AxiosError) => {
      const { response, config, code } = error

      // 开发环境日志
      // if (isDevelopment()) {
      // 	console.error('❌ Response Error:', {
      // 		status: response?.status,
      // 		url: config?.url,
      // 		message: error.message,
      // 		code,
      // 	})
      // }

      // 取消请求
      if (axios.isCancel(error)) {
        throw createApiError.cancel('请求已取消')
      }

      // 401 未授权处理
      if (response?.status === 401) {
        await handleUnauthorized()
        throw createApiError.auth('用户未授权')
      }

      // 网络错误
      if (!response) {
        const isTimeout = code === 'ECONNABORTED'

        if (isTimeout) {
          throw createApiError.timeout('请求超时，请重试')
        } else {
          throw createApiError.network('网络连接失败，请检查网络设置')
        }
      }

      // 服务器错误
      if (response.status >= 500) {
        throw createApiError.server('服务器错误，请稍后重试', response.status)
      }

      // 其他客户端错误
      let message = '请求失败'

      if (
        response.data &&
        typeof response.data === 'object' &&
        'message' in response.data
      ) {
        message = (response.data as any).message || message
        //@ts-ignore
      } else if (error.message) {
        //@ts-ignore
        message = error.message
      }

      throw createApiError.unknown(message)
    },
  )
}

/**
 * 全局Headers管理方法
 */
export const setGlobalHeaders = (headers: Record<string, string>): void => {
  globalHeaders = { ...globalHeaders, ...headers }
}

export const getGlobalHeaders = (): Record<string, string> => {
  return { ...globalHeaders }
}

export const clearGlobalHeaders = (): void => {
  globalHeaders = {}
}

export const removeGlobalHeader = (key: string): void => {
  delete globalHeaders[key]
}

/**
 * 设置完整的拦截器
 */
export const setupInterceptors = (instance: AxiosInstance): void => {
  setupRequestInterceptor(instance)
  setupResponseInterceptor(instance)
}
