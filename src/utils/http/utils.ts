import { AxiosError, AxiosResponse } from 'axios'
import { delay } from './config'
import { ApiError } from './errors'
import { ApiResponse, ErrorType, RetryConfig } from './types'

/**
 * 重试逻辑
 */
export const shouldRetry = (
  error: AxiosError,
  retryConfig?: RetryConfig,
): boolean => {
  if (!retryConfig || retryConfig.retries <= 0) {
    return false
  }

  if (retryConfig.retryCondition) {
    return retryConfig.retryCondition(error)
  }

  // 默认重试条件
  return (
    !error.response || // 网络错误
    error.response.status >= 500 || // 服务器错误
    error.response.status === 429 // 限流
  )
}

/**
 * 带重试的请求执行器
 */
export const executeWithRetry = async <T>(
  requestFn: () => Promise<AxiosResponse<ApiResponse<T>>>,
  retryConfig?: RetryConfig,
): Promise<AxiosResponse<ApiResponse<T>>> => {
  let lastError: ApiError | undefined
  let attempt = 0
  const maxAttempts = (retryConfig?.retries ?? 0) + 1

  while (attempt < maxAttempts) {
    try {
      const response = await requestFn()
      return response
    } catch (error) {
      attempt++
      lastError = error as ApiError

      // 如果不是最后一次尝试且错误可重试
      if (
        attempt < maxAttempts &&
        shouldRetry(error as AxiosError, retryConfig)
      ) {
        const delayMs = retryConfig?.retryDelay ?? 1000 * attempt

        if (process.env.NODE_ENV === 'development') {
          console.log(
            `🔄 Retrying request (${attempt}/${maxAttempts - 1}) after ${delayMs}ms`,
          )
        }

        await delay(delayMs)
        continue
      }

      break
    }
  }

  // 添加重试次数信息
  if (lastError) {
    ;(lastError as any).retries = attempt - 1
    throw lastError
  }

  // 如果没有错误但也没有返回，抛出未知错误
  throw new ApiError('请求执行失败', ErrorType.UNKNOWN, { isRetryable: false })
}
