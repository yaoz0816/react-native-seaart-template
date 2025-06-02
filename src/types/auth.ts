/**
 * @filename auth.ts
 * @description 认证相关类型定义
 */

import { ID, LanguageCode, MediaInfo, Timestamp, URL } from './common'
import { UserInfo } from './user'

// ==================== 认证相关 ====================

/**
 * 兴趣标签
 */
export interface InterestTag extends MediaInfo {
  id: ID
  app: string
  web: string
}

/**
 * 新用户配置信息
 */
export interface NewUserConfigInfo {
  items: Array<{
    sex: number
    interest_tag: InterestTag[]
  }>
}

/**
 * 用户激活参数
 */
export interface UserActivationParams {
  /** 年龄确认 */
  age_confirm: boolean
  /** 用户名 */
  name: string
  /** 兴趣标签 */
  tags: Array<{ id: ID }>
  /** 令牌 */
  token: string
  /** 是否跳过 */
  skip: boolean
  /** 语言 */
  lang: LanguageCode
  /** 邀请用户码 */
  invitation_user_code: string
}

/**
 * 邮箱登录参数
 */
export interface EmailLoginParams {
  email: string
  password: string
  /** AppsFlyer ID（可选） */
  apps_flyer_id?: string
}

/**
 * 登录响应
 */
export interface LoginResponse {
  /** 用户信息 */
  account: Partial<UserInfo>
  /** 访问令牌 */
  token: string
}

/**
 * 登录内容（包含激活状态）
 */
export interface LoginContent extends LoginResponse {
  /** 是否已激活 */
  is_active?: boolean
}

/**
 * 语言设置参数
 */
export interface LanguageSettingParams {
  /** 语言代码 */
  lang_code: LanguageCode
  /** 模式（1为按钮模式） */
  mode?: 1
}

/**
 * 服务配置请求
 */
export interface ServiceConfigRequest {
  /** 金丝雀配置 */
  'canary_*': string
  /** 应用版本控制 */
  app_version_contral: string
  /** 应用首页灰度 */
  app_home_gary: string
}

/**
 * 登录渠道枚举
 */
export enum LoginChannel {
  /** 邮箱登录 */
  Email = 1,
  /** Google登录 */
  Google = 2,
  /** 苹果登录 */
  Apple = 3,
  /** Facebook登录 */
  Facebook = 4,
  /** 微信登录 */
  WeChat = 5,
  /** QQ登录 */
  QQ = 6,
  /** 微博登录 */
  Weibo = 7,
  /** 游客登录 */
  Guest = 16,
}

/**
 * 认证状态
 */
export enum AuthStatus {
  /** 未登录 */
  NotLoggedIn = 0,
  /** 已登录但未激活 */
  LoggedInNotActivated = 1,
  /** 已登录且已激活 */
  LoggedInActivated = 2,
}

/**
 * 引导状态
 */
export enum GuideStatus {
  /** 未开始 */
  NotStarted = 0,
  /** 进行中 */
  InProgress = 1,
  /** 已完成 */
  Completed = 2,
}

// ==================== OAuth相关 ====================

/**
 * OAuth提供商
 */
export enum OAuthProvider {
  Google = 'google',
  Apple = 'apple',
  Facebook = 'facebook',
  WeChat = 'wechat',
  QQ = 'qq',
  Weibo = 'weibo',
}

/**
 * OAuth登录参数
 */
export interface OAuthLoginParams {
  /** 提供商 */
  provider: OAuthProvider
  /** 访问令牌 */
  access_token: string
  /** ID令牌（Apple登录需要） */
  id_token?: string
  /** 授权码 */
  code?: string
  /** 用户信息（某些提供商需要） */
  user_info?: {
    id: string
    name?: string
    email?: string
    avatar?: URL
  }
}

/**
 * 令牌刷新参数
 */
export interface TokenRefreshParams {
  /** 刷新令牌 */
  refresh_token: string
}

/**
 * 令牌响应
 */
export interface TokenResponse {
  /** 访问令牌 */
  access_token: string
  /** 刷新令牌 */
  refresh_token: string
  /** 令牌类型 */
  token_type: string
  /** 过期时间（秒） */
  expires_in: number
  /** 过期时间戳 */
  expires_at: Timestamp
}

// ==================== 会话管理 ====================

/**
 * 会话信息
 */
export interface SessionInfo {
  /** 会话ID */
  session_id: string
  /** 用户ID */
  user_id: ID
  /** 设备ID */
  device_id: string
  /** 创建时间 */
  created_at: Timestamp
  /** 最后活跃时间 */
  last_active_at: Timestamp
  /** 过期时间 */
  expires_at: Timestamp
  /** IP地址 */
  ip_address?: string
  /** 用户代理 */
  user_agent?: string
}

/**
 * 设备信息
 */
export interface DeviceRegistration {
  /** 设备ID */
  device_id: string
  /** 设备类型 */
  device_type: 'ios' | 'android' | 'web' | 'desktop'
  /** 设备名称 */
  device_name?: string
  /** 推送令牌 */
  push_token?: string
  /** 应用版本 */
  app_version: string
  /** 系统版本 */
  os_version: string
}
