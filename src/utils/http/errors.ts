import { AxiosResponse } from 'axios'
import { ErrorType } from './types'

/**
 * 自定义错误类
 */
export class ApiError extends Error {
  type: ErrorType
  code?: number | string
  status?: number
  response?: AxiosResponse
  isRetryable: boolean

  constructor(
    message: string,
    type: ErrorType,
    options: {
      code?: number | string
      status?: number
      response?: AxiosResponse
      isRetryable?: boolean
    } = {},
  ) {
    super(message)
    this.name = 'ApiError'
    this.type = type
    this.code = options.code
    this.status = options.status
    this.response = options.response
    this.isRetryable = options.isRetryable ?? false
  }
}

/**
 * 错误处理工具函数
 */
export const handleApiError = (error: unknown): string => {
  if (error instanceof ApiError) {
    switch (error.type) {
      case ErrorType.NETWORK:
        return '网络连接失败，请检查网络设置'
      case ErrorType.TIMEOUT:
        return '请求超时，请重试'
      case ErrorType.AUTH:
        return '用户未授权，请重新登录'
      case ErrorType.SERVER:
        return '服务器错误，请稍后重试'
      case ErrorType.BUSINESS:
        return error.message || '业务处理失败'
      case ErrorType.CANCEL:
        return '请求已取消'
      default:
        return error.message || '请求失败'
    }
  }

  if (error instanceof Error) {
    return error.message
  }

  return '未知错误'
}

/**
 * 创建标准错误
 */
export const createApiError = {
  network: (message = '网络连接失败') =>
    new ApiError(message, ErrorType.NETWORK, { isRetryable: true }),

  timeout: (message = '请求超时') =>
    new ApiError(message, ErrorType.TIMEOUT, { isRetryable: true }),

  auth: (message = '用户未授权') =>
    new ApiError(message, ErrorType.AUTH, { isRetryable: false }),

  server: (message = '服务器错误', status?: number) =>
    new ApiError(message, ErrorType.SERVER, { status, isRetryable: true }),

  business: (message = '业务处理失败', code?: number | string) =>
    new ApiError(message, ErrorType.BUSINESS, { code, isRetryable: false }),

  cancel: (message = '请求已取消') =>
    new ApiError(message, ErrorType.CANCEL, { isRetryable: false }),

  unknown: (message = '未知错误') =>
    new ApiError(message, ErrorType.UNKNOWN, { isRetryable: false }),
}
