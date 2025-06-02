/**
 * @filename enum.ts
 * @description MMKV 存储键名枚举定义
 */

// ==================== MMKV 键名枚举 ====================
export enum MMKVKeys {
  // 用户相关
  USER_TOKEN = 'user_token',
  USER_INFO = 'user_info',
  USER_SETTINGS = 'user_settings',
  USER_PREFERENCES = 'user_preferences',

  // 应用配置
  THEME_MODE = 'theme_mode',
  LANGUAGE = 'language',
  FIRST_LAUNCH = 'first_launch',
  APP_VERSION = 'app_version',

  // 缓存数据
  API_CACHE = 'api_cache',
  IMAGE_CACHE = 'image_cache',
  TEMP_DATA = 'temp_data',

  // 业务数据
  DRAFT_CONTENT = 'draft_content',
  SEARCH_HISTORY = 'search_history',
  RECENT_VIEWED = 'recent_viewed',

  // 系统数据
  DEVICE_INFO = 'device_info',
  CRASH_LOGS = 'crash_logs',
  PERFORMANCE_DATA = 'performance_data',

  // ==================529========================

  ///领取任务奖励接口
  TASK_REWARD = 'TASK_REWARD',
  ///上报事件缓存
  REPORT_EVENT = 'REPORT_EVENT',
  ///iOS-IDFA
  APP_IDFA = 'APP_IDFA',
  //afid
  APP_AFID = 'APP_AFID',
  ///android-ADID
  APP_ADID = 'APP_ADID',
  TOP_BANNER = 'TOP_BANNER',

  USER_ID = 'USER_ID',
  SERVICE_CONFIG = 'SERVICE_CONFIG',
  START_UNIQUEID = 'START_UNIQUEID',
  USER_CURRENT_COUNTRY_CODE = 'USER_CURRENT_COUNTRY_CODE',
  UUID_KEY = 'UUID',
  USER_APPFLYER_ADID = 'USER_APPFLYER_ADID',
  USER_APPFLYER_AFID = 'USER_APPFLYER_AFID',
  FIRST_UPDATE_NORMAL = 'FIRST_UPDATE_NORMAL',
  CACHE_MY_DATA = 'CACHE_MY_DATA',
}

// ==================== 存储键名类型 ====================
export type StorageKey = keyof typeof MMKVKeys | string

// ==================== 缓存分类 ====================
export const CACHE_CATEGORIES = {
  USER: [
    MMKVKeys.USER_TOKEN,
    MMKVKeys.USER_INFO,
    MMKVKeys.USER_SETTINGS,
    MMKVKeys.USER_PREFERENCES,
  ],

  APP: [
    MMKVKeys.THEME_MODE,
    MMKVKeys.LANGUAGE,
    MMKVKeys.FIRST_LAUNCH,
    MMKVKeys.APP_VERSION,
  ],

  CACHE: [MMKVKeys.API_CACHE, MMKVKeys.IMAGE_CACHE, MMKVKeys.TEMP_DATA],

  BUSINESS: [
    MMKVKeys.DRAFT_CONTENT,
    MMKVKeys.SEARCH_HISTORY,
    MMKVKeys.RECENT_VIEWED,
  ],

  SYSTEM: [
    MMKVKeys.DEVICE_INFO,
    MMKVKeys.CRASH_LOGS,
    MMKVKeys.PERFORMANCE_DATA,
  ],
} as const

// ==================== 键名验证工具 ====================
export const isValidMMKVKey = (key: string): key is MMKVKeys => {
  return Object.values(MMKVKeys).includes(key as MMKVKeys)
}

// ==================== 获取分类下的所有键名 ====================
export const getKeysByCategory = (
  category: keyof typeof CACHE_CATEGORIES,
): readonly MMKVKeys[] => {
  return CACHE_CATEGORIES[category]
}

// ==================== 默认导出 ====================
export default MMKVKeys
