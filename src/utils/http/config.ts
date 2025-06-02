import { Platform } from 'react-native'
import { AppValues } from '../../config/appValues'

/**
 * 环境配置
 */
export const getBaseURL = (): string => {
  if (process.env.NODE_ENV === 'development') {
    return 'https://www.seaart.ai'
  }

  return 'https://www.seaart.ai'
}

/**
 * 请求默认配置
 */
export const DEFAULT_CONFIG = {
  baseURL: getBaseURL(),
  timeout: 15000,
  headers: {
    Accept: 'application/json',
    'X-Platform': Platform.OS,
    'X-App-Id': AppValues.APPID,
    'X-Device-Name': AppValues.DEVICE_NAME,
    'X-Device-OS': AppValues.DEVICE_OS,
    'X-Version': AppValues.VERSION,
  },
} as const

/**
 * 缓存默认配置
 */
export const DEFAULT_CACHE_CONFIG = {
  defaultTTL: 5 * 60 * 1000, // 5分钟
  maxSize: 100,
} as const

/**
 * 重试默认配置
 */
export const DEFAULT_RETRY_CONFIG = {
  retries: 2,
  retryDelay: 1000,
} as const

/**
 * 性能监控默认配置
 */
export const DEFAULT_METRICS_CONFIG = {
  maxMetrics: 1000,
  slowRequestThreshold: 1000, // 1秒
} as const

/**
 * 请求去重默认配置
 */
export const DEFAULT_DEDUPLICATION_CONFIG = {
  enabled: true,
} as const

/**
 * 生成请求ID
 */
export const generateRequestId = (): string => {
  return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

/**
 * 延迟函数
 */
export const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms))

/**
 * 检查是否为开发环境
 */
export const isDevelopment = (): boolean => {
  return process.env.NODE_ENV === 'development'
}

/**
 * 获取当前时间戳
 */
export const getCurrentTimestamp = (): number => {
  return Date.now()
}

/**
 * 格式化错误信息
 */
export const formatErrorMessage = (error: any): string => {
  if (typeof error === 'string') {
    return error
  }

  if (error && typeof error === 'object') {
    return error.message || error.toString()
  }

  return '未知错误'
}

/**
 * 验证URL格式
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * 处理相对路径
 */
export const resolveUrl = (baseUrl: string, path: string): string => {
  // 如果path已经是完整URL，直接返回
  if (isValidUrl(path)) {
    return path
  }

  // 处理相对路径
  const cleanBase = baseUrl.replace(/\/$/, '')
  const cleanPath = path.replace(/^\//, '')

  return `${cleanBase}/${cleanPath}`
}

/**
 * 配置验证
 */
export const validateConfig = (config: any): boolean => {
  // 基础验证
  if (!config) {
    return false
  }

  // 验证baseURL
  if (config.baseURL && !isValidUrl(config.baseURL)) {
    console.warn('Invalid baseURL provided:', config.baseURL)
    return false
  }

  // 验证timeout
  if (
    config.timeout &&
    (typeof config.timeout !== 'number' || config.timeout <= 0)
  ) {
    console.warn('Invalid timeout provided:', config.timeout)
    return false
  }

  return true
}

/**
 * 合并配置
 */
export const mergeConfig = <T extends Record<string, any>>(
  defaultConfig: T,
  userConfig: Partial<T>,
): T => {
  return {
    ...defaultConfig,
    ...userConfig,
    headers: {
      ...defaultConfig.headers,
      ...userConfig.headers,
    },
  }
}

/**
 * 环境变量工具
 */
export const env = {
  isDev: process.env.NODE_ENV === 'development',
  baseUrl: getBaseURL(),
  platform: 'react-native',
  version: '1.0.0',
} as const
