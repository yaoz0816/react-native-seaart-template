/**
 * @filename user.ts
 * @description 用户相关类型定义
 */

import { UserType } from '../config/enum'
import {
  Gender,
  ID,
  LanguageCode,
  LocationInfo,
  SwitchStatus,
  Timestamp,
  TimestampInfo,
  URL,
  UserStatus,
} from './common'

// ==================== 用户基础信息 ====================

/**
 * 用户基础信息
 */
export interface UserBasicInfo extends TimestampInfo {
  id: ID
  name: string
  email?: string
  head?: URL
  status: UserStatus
  role?: string
}

/**
 * 用户档案信息
 */
export interface UserProfile {
  /** 用户介绍 */
  intro?: string
  /** 性别 */
  sex: Gender
  /** 是否显示性别 */
  show_sex: SwitchStatus
  /** 背景图片 */
  background_img?: URL
  /** 邀请码 */
  invite_user_code?: string
  /** 已邀请人数 */
  invite_user_num?: number
}

/**
 * 用户统计信息
 */
export interface UserStats {
  /** 被收藏数量 */
  collected_num: number
  /** 被关注数量 */
  follower_num: number
  /** 关注数量 */
  following_num: number
  /** 浏览量 */
  view_cnt: number
  /** 累计活跃天数 */
  num_of_active?: number
}

/**
 * 用户设置信息
 */
export interface UserSettings {
  /** 背景封面 */
  bg_cover?: URL
  /** 绿色模式 */
  green_mode?: SwitchStatus
  /** 智能分析模式 */
  insight?: SwitchStatus
  /** 是否自动发布社区 */
  is_auto_pub_community?: boolean
  /** 是否变体操作 */
  is_variant_operation?: boolean
  /** 是否关闭本地化 */
  is_off_localization: boolean
  /** 语言码 */
  lang_code?: LanguageCode
  /** NSFW Plus 设置 */
  nsfw_plus?: SwitchStatus
  /** 推送设置 */
  push_settings: PushSettings
  /** 自动保存作品 */
  auto_save_artwork: SwitchStatus
  /** 显示成人内容 */
  show_sexy_content: SwitchStatus
  /** 使用官方推荐参数 */
  use_model_preset_meta_mode: SwitchStatus
  show_eyes: SwitchStatus
}

/**
 * 推送设置
 */
export interface PushSettings {
  /** 评论消息推送 */
  comment_push: SwitchStatus
  /** 关注消息推送 */
  follow_push: SwitchStatus
  /** 赞藏消息推送 */
  like_favorite_push: SwitchStatus
  /** 系统消息推送 */
  system_push: SwitchStatus
  /** 数字人消息推送 */
  character_push: SwitchStatus
}

/**
 * 数字人设置
 */
export interface CharacterSettings {
  /** GPT模型 */
  gpt_model: string
  /** 自动TTS */
  auto_tts: SwitchStatus
  /** 默认卡片 */
  default_card?: string
  /** 多样性 */
  diversity?: number
  /** 启用记忆 */
  enable_memory?: SwitchStatus
  /** 启用流式聊天 */
  enable_stream_chat?: SwitchStatus
  /** 性别 */
  gender?: string
  /** 隐藏背景 */
  hide_bg?: SwitchStatus
  /** 回复长度 */
  length_of_reply?: number
  /** 温度 */
  temperature?: number
  /** 是否设置伴侣模型 */
  is_set_companion_model?: SwitchStatus
  /** 是否设置功能模型 */
  is_set_functionality_model?: SwitchStatus
  /** 工作流编号 */
  workflow_no?: string
}

/**
 * 完整用户信息
 */
export interface UserInfo
  extends UserBasicInfo,
    UserProfile,
    UserStats,
    LocationInfo {
  /** 引导状态 */
  guide_status: number
  /** 是否激活 */
  is_active?: boolean
  /** 登录渠道 */
  account_login_channel?: number
  /** 应用信息 */
  apps_flyer_id?: string
  apps_flyer_adid?: string
  /** 功能开关 */
  enable_tavern?: boolean
  enable_ai?: boolean
  enable_gf?: boolean
  enable_nsfw_plus?: boolean
  enable_portfolio?: boolean
  enable_video?: boolean
  /** 显示设置 */
  show_lab?: boolean
  show_sexy_button?: SwitchStatus
  show_evaluation_guide?: boolean
  can_show_ad?: boolean
  is_questionnaire?: boolean
  /** 用户设置 */
  settings?: UserSettings
  /** 数字人设置 */
  character_setting?: CharacterSettings
  /** 首页设置 */
  home_set?: Partial<UserProfile>
  /** 任务信息 */
  task_num?: number
  /** 引导弹窗 */
  guide_pop?: boolean
  character_pop?: boolean
  /** App ID */
  app_id?: string
  /** 是否显示视频算力挽留弹窗 */
  is_show_video_calculate?: boolean
  /** 标签相关 */
  collect_tags?: ID[]
  managed_tags?: ID[]
  tags?: UserTag[]
  /** 审核信息 */
  review?: {
    avatar: string
    nickname: string
  }
  current_country_code?: string
}

/**
 * 用户标签
 */
export interface UserTag {
  id?: ID
  name?: string
  style?: string
}

// ==================== 用户资产相关 ====================

/**
 * 企业资产
 */
export interface EnterpriseAssets {
  /** 剩余存储 */
  cloud: number
  /** 剩余算力 */
  compute: number
}

/**
 * 试用限制
 */
export interface TrialLimits {
  /** 2.0模式 */
  pattern_20: number
  /** 2.1模式 */
  pattern_21: number
  /** 实验室 */
  studio: number
}

/**
 * 用户资产信息
 */
export interface UserAssetsInfo extends TimestampInfo {
  /** 账号ID */
  account_id?: ID
  /** 用户类型 */
  user_type: UserType
  /** 产品等级 */
  product_level: number
  /** 购买类型 1.普通购买 2.订阅 */
  purchase_type?: 1 | 2
  /** 产品类型 1.次卡 2.月卡 3.年卡 */
  product_type: number

  /** 权益到期时间 */
  expiry_time: Timestamp
  lite_expiry_time?: Timestamp
  big_expiry_time: Timestamp
  buff_vip_expiry_time: Timestamp
  drawing_expiry_time?: Timestamp
  temp_coins_expiry_time?: Timestamp

  /** 权益状态 */
  is_active?: boolean
  big_is_active?: boolean
  lite_is_active?: boolean

  /** 算力相关 */
  calculate_coins?: number
  temp_coins?: number
  free_coins?: number
  paid_coins?: number
  every_temp_coins: number
  coins_version?: number

  /** 队列限制 */
  hang_limit?: number
  run_limit?: number
  max_out_image?: number
  fast_queue_trial_num: number

  /** 充值相关 */
  max_recharge?: number
  total_recharge: number
  extra_recharge?: boolean

  /** 功能开关 */
  privacy_mode?: boolean
  show_auto_pub_switch?: boolean
  vip_customer_service?: boolean
  work_delete?: boolean
  is_send_tourist_temp_coins: boolean

  /** 广告相关 */
  app_ad_num: number

  /** 企业资产 */
  emp_assets?: EnterpriseAssets

  /** 试用限制 */
  try_out_limit?: TrialLimits

  /** 最近购买信息 */
  latest_sub_cp_product_id: string
  latest_sub_sys_order_id: string
}

// ==================== 消息相关 ====================

/**
 * 消息数量统计
 */
export interface MessageCount {
  /** 评论 */
  com: number
  /** 关注 */
  fol: number
  /** 赞藏 */
  likeCol: number
  /** 系统 */
  sys: number
  /** 聊天 */
  chat: number
}

/**
 * 版本更新信息
 */
export type VersionInfo = {
  app_id: string
  download_url: {
    app_store: string
    download: string
    google_play: string
  }
  create_at: string
  force_upgrade: number //1 强制更新 2.否
  id: string
  judge_version: string //判断版本 本机小于此版本提示更新
  remark: string
  target_version: string //目标版本
  title: string
  upgrade_desc: string //更新描述
}
