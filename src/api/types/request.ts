/**
 * @filename api/types/request.ts
 * @description API请求相关类型定义
 */

import { ID, LanguageCode } from '../../types'

// ==================== 服务配置请求 ====================

// 系统配置
export interface SystemConfigRequest {
  /** 系统配置 */
  app_id: string
}

// ==================== 用户相关请求 ====================

/**
 * 用户激活请求参数
 */
export interface UserActivationRequest {
  /** 年龄确认 */
  age_confirm: boolean
  /** 用户名 */
  name: string
  /** 兴趣标签ID列表 */
  tags: Array<{ id: ID }>
  /** 访问令牌 */
  token: string
  /** 是否跳过 */
  skip: boolean
  /** 语言代码 */
  lang: LanguageCode
  /** 邀请用户码 */
  invitation_user_code: string
}

/**
 * 邮箱登录请求参数
 */
export interface EmailLoginRequest {
  email: string
  password: string
  /** AppsFlyer ID（可选） */
  apps_flyer_id?: string
}

/**
 * 语言设置请求参数
 */
export interface LanguageSettingRequest {
  /** 语言代码 */
  lang_code: LanguageCode
  /** 模式（1为按钮模式） */
  mode?: 1
}

// ==================== 设置相关请求 ====================

/**
 * 用户设置更新请求
 */
export interface UserSettingsUpdateRequest {
  /** 背景封面 */
  bg_cover?: string
  /** 绿色模式 */
  green_mode?: number
  /** 智能分析模式 */
  insight?: number
  /** 是否自动发布社区 */
  is_auto_pub_community?: boolean
  /** 是否变体操作 */
  is_variant_operation?: boolean
  /** 是否关闭本地化 */
  is_off_localization?: boolean
  /** 语言码 */
  lang_code?: string
  /** NSFW Plus 设置 */
  nsfw_plus?: number
  /** 推送设置 */
  comment_push?: number
  follow_push?: number
  like_favorite_push?: number
  system_push?: number
  character_push?: number
  /** 自动保存作品 */
  auto_save_artwork?: number
  /** 显示成人内容 */
  show_sexy_content?: number
  /** 显示小眼睛 */
  show_eyes?: number
  /** 使用官方推荐参数 */
  use_model_preset_meta_mode?: number
}
