import axios, { AxiosInstance } from 'axios'
import { cacheManager } from './cache'
import { DEFAULT_CONFIG } from './config'
import { deduplicator } from './deduplication'
import { ApiError } from './errors'
import { setupInterceptors } from './interceptors'
import { metricsCollector } from './metrics'
import {
  ApiResponse,
  BatchOptions,
  DownloadOptions,
  PaginatedResponse,
  RequestConfig,
  UploadOptions,
  ErrorType,
} from './types'
import { executeWithRetry } from './utils'

/**
 * 创建 Axios 实例
 */
const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create(DEFAULT_CONFIG)
  setupInterceptors(instance)
  return instance
}

/**
 * Axios 实例
 */
const axiosInstance = createAxiosInstance()

/**
 * 通用请求方法
 */
const apiRequest = async <T = any>(config: RequestConfig): Promise<T> => {
  const {
    cache,
    retry,
    deduplication = false,
    enableMetrics = true,
    ...axiosConfig
  } = config

  // 性能监控
  let metric: any

  if (enableMetrics) {
    metric = metricsCollector.startRequest()
  }

  try {
    // 缓存检查
    if (cache && !cache.force) {
      const cacheKey = cache.key || cacheManager.getKeyForRequest(axiosConfig)
      const cachedData = cacheManager.get<T>(cacheKey)

      if (cachedData) {
        if (metric) {
          metric.cached = true
          metricsCollector.endRequest(metric)
        }

        return cachedData
      }
    }

    // 请求函数
    const requestFn = () => axiosInstance.request<ApiResponse<T>>(axiosConfig)

    // 请求去重
    const executeRequest = deduplication
      ? () => deduplicator.deduplicate(axiosConfig, requestFn)
      : requestFn

    // 执行请求（带重试）
    const response = await executeWithRetry(executeRequest, retry)

    // 缓存结果
    if (cache && response.data.success) {
      const cacheKey = cache.key || cacheManager.getKeyForRequest(axiosConfig)
      cacheManager.set(cacheKey, response.data.data, cache.ttl)
    }

    // 性能监控结束
    if (metric) {
      metricsCollector.endRequest(metric, response)
    }

    return response.data.data
  } catch (error) {
    // 性能监控结束（错误情况）
    if (metric) {
      metricsCollector.endRequest(metric, undefined, error)
    }

    throw error
  }
}

/**
 * GET 请求
 */
export const get = <T = any>(
  url: string,
  params?: any,
  config?: RequestConfig,
): Promise<T> => {
  return apiRequest<T>({
    method: 'GET',
    url,
    params,
    cache: { ttl: 5 * 60 * 1000 }, // 默认5分钟缓存
    deduplication: true, // 默认开启去重
    ...config,
  })
}

/**
 * POST 请求
 */
export const post = <T = any>(
  url: string,
  data?: any,
  config?: RequestConfig,
): Promise<T> => {
  return apiRequest<T>({
    method: 'POST',
    url,
    data,
    retry: { retries: 2, retryDelay: 1000 }, // 默认重试2次
    ...config,
  })
}

/**
 * PUT 请求
 */
export const put = <T = any>(
  url: string,
  data?: any,
  config?: RequestConfig,
): Promise<T> => {
  return apiRequest<T>({
    method: 'PUT',
    url,
    data,
    retry: { retries: 2, retryDelay: 1000 },
    ...config,
  })
}

/**
 * DELETE 请求
 */
export const del = <T = any>(
  url: string,
  config?: RequestConfig,
): Promise<T> => {
  return apiRequest<T>({
    method: 'DELETE',
    url,
    retry: { retries: 1, retryDelay: 1000 },
    ...config,
  })
}

/**
 * 分页请求
 */
export const getPaginated = <T = any>(
  url: string,
  params?: { page?: number; pageSize?: number; [key: string]: any },
  config?: RequestConfig,
): Promise<PaginatedResponse<T>['data']> => {
  return apiRequest<PaginatedResponse<T>['data']>({
    method: 'GET',
    url,
    params: { page: 1, pageSize: 20, ...params },
    cache: { ttl: 2 * 60 * 1000 }, // 2分钟缓存
    deduplication: true,
    ...config,
  })
}

/**
 * 文件上传
 */
export const upload = <T = any>(
  url: string,
  file: File | Blob,
  options?: UploadOptions,
): Promise<T> => {
  const formData = new FormData()
  formData.append(options?.fieldName || 'file', file)

  // 添加额外数据
  if (options?.data) {
    Object.entries(options.data).forEach(([key, value]) => {
      formData.append(key, value != null ? String(value) : '')
    })
  }

  return apiRequest<T>({
    method: 'POST',
    url,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    timeout: 60000, // 上传超时时间较长
    onUploadProgress: (progressEvent: any) => {
      if (options?.onProgress && progressEvent.total) {
        const progress = Math.round(
          (progressEvent.loaded / progressEvent.total) * 100,
        )

        options.onProgress(progress)
      }
    },
    retry: { retries: 1, retryDelay: 2000 },
    enableMetrics: true,
    ...options?.config,
  })
}

/**
 * 文件下载
 */
export const download = async (
  url: string,
  options?: DownloadOptions,
): Promise<Blob> => {
  const response = await axiosInstance({
    method: 'GET',
    url,
    responseType: 'blob',
    timeout: 60000, // 下载超时时间较长
    onDownloadProgress: (progressEvent: any) => {
      if (options?.onProgress && progressEvent.total) {
        const progress = Math.round(
          (progressEvent.loaded / progressEvent.total) * 100,
        )

        options.onProgress(progress)
      }
    },
    ...options?.config,
  })

  return response.data
}

/**
 * 批量请求
 */
export const batch = async <T = any>(
  requests: RequestConfig[],
  options?: BatchOptions,
): Promise<Array<T | ApiError>> => {
  const { concurrent = 5, failFast = false } = options || {}

  // 参数验证
  if (requests.length === 0) {
    return []
  }

  // 确保并发数在合理范围内
  const safeConcurrent = Math.max(1, Math.min(concurrent, 50))

  // 统一的请求执行函数
  const executeRequest = async (
    config: RequestConfig,
  ): Promise<T | ApiError> => {
    try {
      return await apiRequest<T>(config)
    } catch (error: unknown) {
      if (error instanceof ApiError) {
        return error
      }

      if (error instanceof Error) {
        return new ApiError(error.message, ErrorType.UNKNOWN, {
          isRetryable: false,
        })
      }

      return new ApiError('未知错误', ErrorType.UNKNOWN, {
        isRetryable: false,
      })
    }
  }

  const results: Array<T | ApiError> = []

  // 批量处理请求
  for (let i = 0; i < requests.length; i += safeConcurrent) {
    const requestBatch = requests.slice(i, i + safeConcurrent)
    const batchPromises = requestBatch.map(executeRequest)

    try {
      const batchResults = await Promise.all(batchPromises)

      // 检查是否在快速失败模式下遇到错误
      if (failFast) {
        const hasError = batchResults.some(
          (result) => result instanceof ApiError,
        )

        if (hasError) {
          const firstError = batchResults.find(
            (result) => result instanceof ApiError,
          ) as ApiError

          throw firstError
        }
      }

      // 使用循环而不是展开运算符以避免栈溢出
      for (const result of batchResults) {
        results.push(result)
      }
    } catch (error) {
      if (failFast) {
        throw error
      }

      // 在容错模式下，即使 Promise.all 失败也继续处理
      const errorResult =
        error instanceof ApiError
          ? error
          : new ApiError('批量请求失败', ErrorType.UNKNOWN, {
              isRetryable: false,
            })

      // 为这一批的所有请求添加错误结果
      for (let j = 0; j < requestBatch.length; j++) {
        results.push(errorResult)
      }
    }
  }

  return results
}

/**
 * 健康检查
 */
export const healthCheck = async (): Promise<boolean> => {
  try {
    await apiRequest({
      method: 'GET',
      url: '/health',
      timeout: 5000,
      skipAuth: true,
      enableMetrics: false,
    })
    return true
  } catch {
    return false
  }
}

/**
 * 取消请求的 CancelToken
 */
export const CancelToken = axios.CancelToken

/**
 * 创建取消令牌
 */
export const createCancelToken = () => axios.CancelToken.source()

// 导出原始 axios 实例
export { axiosInstance as instance }
