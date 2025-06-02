// 主要请求方法
export {
  batch,
  CancelToken,
  createCancelToken,
  del,
  download,
  get,
  getPaginated,
  healthCheck,
  instance,
  post,
  put,
  upload,
} from './request'

// 类型定义
export type {
  ApiResponse,
  BatchOptions,
  CacheConfig,
  DownloadOptions,
  PaginatedResponse,
  RequestConfig,
  RequestMetrics,
  RetryConfig,
  UploadOptions,
} from './types'

export { ErrorType } from './types'

// 错误处理
export { ApiError, createApiError, handleApiError } from './errors'

// Token 管理
export { clearToken, getToken, hasToken, refreshToken, setToken } from './token'

// 缓存管理
export {
  clearCache,
  clearCacheByKey,
  clearCacheByPattern,
  getCacheStats,
} from './cache'

// 性能监控
export {
  clearMetrics,
  exportMetricsData,
  getMetrics,
  getPerformanceSummary,
} from './metrics'

// 请求去重
export {
  cancelAllRequests,
  cancelRequest,
  getDeduplicationStats,
  getPendingRequestsCount,
} from './deduplication'

// 拦截器配置
export {
  clearGlobalHeaders,
  getGlobalHeaders,
  removeGlobalHeader,
  setGlobalHeaders,
} from './interceptors'

// 工具方法
export { executeWithRetry, shouldRetry } from './utils'

// 配置相关
export {
  delay,
  env,
  generateRequestId,
  getBaseURL,
  isDevelopment,
  mergeConfig,
  validateConfig,
} from './config'

// 为了保持向后兼容，重新导入必要的模块
import {
  batch,
  CancelToken,
  createCancelToken,
  del,
  download,
  get,
  getPaginated,
  healthCheck,
  post,
  put,
  upload,
} from './request'
import { clearCache, clearCacheByKey } from './cache'
import { ApiError } from './errors'
import {
  clearGlobalHeaders,
  getGlobalHeaders,
  removeGlobalHeader,
  setGlobalHeaders,
} from './interceptors'
import { clearMetrics, getMetrics } from './metrics'
import { clearToken, getToken, setToken } from './token'
import { ErrorType } from './types'

/**
 * 默认导出 - 常用方法集合
 */
export default {
  // 基础请求方法
  get,
  post,
  put,
  delete: del,
  getPaginated,
  upload,
  download,
  batch,

  // Token 管理
  setToken,
  getToken,
  clearToken,

  // Headers 管理
  setGlobalHeaders,
  getGlobalHeaders,
  clearGlobalHeaders,
  removeGlobalHeader,

  // 缓存管理
  clearCache,
  clearCacheByKey,

  // 性能监控
  getMetrics,
  clearMetrics,

  // 工具方法
  CancelToken,
  createCancelToken,
  healthCheck,

  // 错误类型
  ErrorType,
  ApiError,
}
