/**
 * @filename api/types/config.ts
 * @description API配置相关类型定义
 */

import { LanguageCode } from '../../types'

// ==================== API配置 ====================

/**
 * API请求配置
 */
export interface ApiConfig {
  /** 基础URL */
  baseURL: string
  /** 请求超时时间（毫秒） */
  timeout: number
  /** 是否携带凭证 */
  withCredentials: boolean
  /** 默认请求头 */
  headers: Record<string, string>
}

/**
 * 环境配置
 */
export interface EnvironmentConfig {
  /** 环境名称 */
  name: 'development' | 'staging' | 'production'
  /** API基础URL */
  apiBaseUrl: string
  /** 是否启用调试 */
  debug: boolean
  /** 日志级别 */
  logLevel: 'error' | 'warn' | 'info' | 'debug'
}

// ==================== 客户端配置 ====================

/**
 * 应用配置
 */
export interface AppConfig {
  /** 应用ID */
  app_id: string
  /** 应用版本 */
  version: string
  /** 构建版本 */
  build_number: string
  /** 支持的语言列表 */
  supported_languages: LanguageCode[]
  /** 默认语言 */
  default_language: LanguageCode
}

/**
 * 功能开关配置
 */
export interface FeatureFlags {
  /** 是否启用AI聊天 */
  enable_ai_chat: boolean
  /** 是否启用视频功能 */
  enable_video: boolean
  /** 是否启用NSFW内容 */
  enable_nsfw: boolean
  /** 是否启用作品集 */
  enable_portfolio: boolean
  /** 是否启用实验室 */
  enable_lab: boolean
  /** 是否启用广告 */
  enable_ads: boolean
}

/**
 * 地区配置
 */
export interface RegionConfig {
  /** 国家代码 */
  country_code: string
  /** 时区 */
  timezone: string
  /** 货币代码 */
  currency_code: string
  /** 是否受限地区 */
  is_restricted: boolean
  /** 功能限制 */
  feature_restrictions: Partial<FeatureFlags>
}

// ==================== 第三方服务配置 ====================

/**
 * 分析服务配置
 */
export interface AnalyticsConfig {
  /** AppsFlyer配置 */
  appsflyer: {
    app_id: string
    dev_key: string
    enabled: boolean
  }
  /** Firebase配置 */
  firebase: {
    project_id: string
    enabled: boolean
  }
  /** 其他分析工具 */
  [key: string]: any
}

/**
 * 推送服务配置
 */
export interface PushConfig {
  /** Firebase推送配置 */
  fcm: {
    sender_id: string
    enabled: boolean
  }
  /** APNs配置 */
  apns: {
    team_id: string
    key_id: string
    enabled: boolean
  }
}

/**
 * 支付配置
 */
export interface PaymentConfig {
  /** 支持的支付方式 */
  supported_methods: string[]
  /** Apple Pay配置 */
  apple_pay: {
    merchant_id: string
    enabled: boolean
  }
  /** Google Pay配置 */
  google_pay: {
    merchant_id: string
    enabled: boolean
  }
}

// ==================== 缓存配置 ====================

/**
 * 缓存策略配置
 */
export interface CacheConfig {
  /** 默认缓存时间（秒） */
  default_ttl: number
  /** 用户信息缓存时间 */
  user_info_ttl: number
  /** 配置信息缓存时间 */
  config_ttl: number
  /** 是否启用缓存 */
  enabled: boolean
}
