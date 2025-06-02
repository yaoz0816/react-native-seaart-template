/**
 * @author 曼巴
 * @date 2025-05-29 星期四
 * @function 公共基础类型定义
 */

// ==================== 基础类型 ====================

/**
 * API响应基础结构
 */
export interface BaseApiResponse<T = any> {
  code: number
  message: string
  data: T
  success: boolean
}

/**
 * 分页数据结构
 */
export interface PaginatedData<T = any> {
  list: T[]
  total: number
  page: number
  pageSize: number
  hasMore: boolean
}

/**
 * 分页响应结构
 */
export interface PaginatedResponse<T = any>
  extends BaseApiResponse<PaginatedData<T>> {}

/**
 * 媒体文件信息
 */
export interface MediaInfo {
  url: string
  width: number
  height: number
  nsfw?: number
  size?: number
  type?: string
}

/**
 * 时间戳相关
 */
export interface TimestampInfo {
  create_at: number
  update_at?: number
  expiry_time?: number
}

/**
 * 地理位置信息
 */
export interface LocationInfo {
  country_code: string
  timezone?: string
  language_code?: string
}

/**
 * 设备信息
 */
export interface DeviceInfo {
  device_id: string
  platform: 'ios' | 'android'
  app_version: string
  os_version: string
}

// ==================== 枚举类型 ====================

/**
 * 性别枚举
 */
export enum Gender {
  Unknown = 0,
  Male = 1,
  Female = 2,
  Other = 3,
}

/**
 * 开关状态枚举
 */
export enum SwitchStatus {
  None = 0,
  On = 1,
  Off = 2,
}

/**
 * 用户状态枚举
 */
export enum UserStatus {
  Inactive = 0,
  Active = 1,
  Suspended = 2,
  Deleted = 3,
}

/**
 * 语言代码枚举
 */
export enum LanguageCode {
  ZH_CN = 'zh-CN',
  ZH_TW = 'zh-TW',
  EN_US = 'en-US',
  JA_JP = 'ja-JP',
  KO_KR = 'ko-KR',
  ES_ES = 'es-ES',
  FR_FR = 'fr-FR',
  DE_DE = 'de-DE',
}

// ==================== 工具类型 ====================

/**
 * 使所有属性为可选
 */
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

/**
 * 使指定属性为必需
 */
export type RequiredBy<T, K extends keyof T> = T & Required<Pick<T, K>>

/**
 * ID类型
 */
export type ID = string

/**
 * 时间戳类型
 */
export type Timestamp = number

/**
 * URL类型
 */
export type URL = string

/**
 * 多语言类型
 */
export type IPropsLang = {
  [key: I18n.AppLang | string]: string
}

/**
 * 审核标签类型
 */
export type ReviewTag = {
  [key in I18n.AppLang]?: string
} & { id: string; cover: string }
