import { AxiosRequestConfig } from 'axios'

/**
 * 基础响应接口
 */
export interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
  success: boolean
  timestamp?: number
  traceId?: string
}

/**
 * 分页响应接口
 */
export interface PaginatedResponse<T = any>
  extends ApiResponse<{
    list: T[]
    total: number
    page: number
    pageSize: number
    hasMore: boolean
  }> {}

/**
 * 错误类型枚举
 */
export enum ErrorType {
  NETWORK = 'NETWORK',
  TIMEOUT = 'TIMEOUT',
  CANCEL = 'CANCEL',
  AUTH = 'AUTH',
  SERVER = 'SERVER',
  BUSINESS = 'BUSINESS',
  UNKNOWN = 'UNKNOWN',
}

/**
 * 重试配置
 */
export interface RetryConfig {
  retries: number
  retryDelay: number
  retryCondition?: (error: any) => boolean
}

/**
 * 缓存配置
 */
export interface CacheConfig {
  ttl: number // 缓存时间(ms)
  key?: string // 自定义缓存key
  force?: boolean // 强制刷新
}

/**
 * 请求配置扩展
 */
export interface RequestConfig extends AxiosRequestConfig {
  showLoading?: boolean
  showError?: boolean
  skipAuth?: boolean
  retry?: RetryConfig
  cache?: CacheConfig
  deduplication?: boolean // 请求去重
  enableMetrics?: boolean // 性能监控
}

/**
 * 性能指标
 */
export interface RequestMetrics {
  startTime: number
  endTime?: number
  duration?: number
  size?: number
  cached?: boolean
  retries?: number
}

/**
 * 缓存项
 */
export interface CacheItem<T = any> {
  data: T
  timestamp: number
  ttl: number
}

/**
 * 上传选项
 */
export interface UploadOptions {
  fieldName?: string
  data?: Record<string, any>
  onProgress?: (progress: number) => void
  config?: RequestConfig
}

/**
 * 下载选项
 */
export interface DownloadOptions {
  onProgress?: (progress: number) => void
  config?: RequestConfig
}

/**
 * 批量请求选项
 */
export interface BatchOptions {
  concurrent?: number // 并发数量限制
  failFast?: boolean // 快速失败模式
}

/**
 * Token刷新队列项
 */
export interface TokenRefreshQueueItem {
  resolve: (token: string) => void
  reject: (error: any) => void
}
