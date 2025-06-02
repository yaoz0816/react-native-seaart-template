/**
 * @filename api/types/response.ts
 * @description API响应相关类型定义
 */

import {
  BaseApiResponse,
  ID,
  PaginatedResponse,
  UserAssetsInfo,
  UserInfo,
  VersionInfo,
} from '../../types'

// ==================== 登录响应 ====================

/**
 * 登录响应数据
 */
export interface LoginResponseData {
  /** 用户信息 */
  account: Partial<UserInfo>
  /** 访问令牌 */
  token: string
  /** 是否已激活 */
  is_active?: boolean
}

/**
 * 登录API响应
 */
export interface LoginApiResponse extends BaseApiResponse<LoginResponseData> {}

// ==================== 用户信息响应 ====================

/**
 * 用户信息API响应
 */
export interface UserInfoApiResponse extends BaseApiResponse<UserInfo> {}

/**
 * 用户资产信息API响应
 */
export interface UserAssetsApiResponse
  extends BaseApiResponse<UserAssetsInfo> {}

// ==================== 配置响应 ====================

/**
 * 应用版本信息API响应
 */
export interface VersionInfoApiResponse extends BaseApiResponse<VersionInfo> {}

/**
 * 服务配置响应数据
 */
export interface ServiceConfigResponse {
  /** 金丝雀配置 */
  'canary_*': string
  /** 应用版本控制 */
  app_version_contral: string
  /** 应用首页灰度 */
  app_home_gary: string
  /** 其他动态配置 */
  [key: string]: any
}

/**
 * 服务配置API响应
 */
export interface ServiceConfigApiResponse
  extends BaseApiResponse<ServiceConfigResponse> {}

// ==================== 新用户配置响应 ====================

/**
 * 兴趣标签数据
 */
export interface InterestTagData {
  id: ID
  app: string
  web: string
  url: string
  width: number
  height: number
  nsfw?: number
}

/**
 * 新用户配置响应数据
 */
export interface NewUserConfigResponseData {
  items: Array<{
    sex: number
    interest_tag: InterestTagData[]
  }>
}

/**
 * 新用户配置API响应
 */
export interface NewUserConfigApiResponse
  extends BaseApiResponse<NewUserConfigResponseData> {}

// ==================== 列表响应 ====================

/**
 * 用户列表API响应
 */
export interface UserListApiResponse extends PaginatedResponse<UserInfo> {}

/**
 * 标签列表数据
 */
export interface TagData {
  id: ID
  name: string
  style?: string
  cover?: string
  description?: string
}

/**
 * 标签列表API响应
 */
export interface TagListApiResponse extends PaginatedResponse<TagData> {}

// ==================== 统计响应 ====================

/**
 * 统计数据
 */
export interface StatsData {
  /** 用户总数 */
  total_users?: number
  /** 活跃用户数 */
  active_users?: number
  /** 今日新增 */
  today_new_users?: number
  /** 其他统计字段 */
  [key: string]: number | undefined
}

/**
 * 统计API响应
 */
export interface StatsApiResponse extends BaseApiResponse<StatsData> {}

// ==================== 文件上传响应 ====================

/**
 * 文件上传响应数据
 */
export interface FileUploadResponseData {
  /** 文件URL */
  url: string
  /** 文件ID */
  file_id: string
  /** 文件大小 */
  size: number
  /** 文件类型 */
  mime_type: string
  /** 文件名 */
  filename: string
}

/**
 * 文件上传API响应
 */
export interface FileUploadApiResponse
  extends BaseApiResponse<FileUploadResponseData> {}
