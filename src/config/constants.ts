/**
 * @filename constants.ts
 * @description 应用常量定义 - 按功能模块分类
 */

// ==================== API 相关常量 ====================
export const API_CONSTANTS = {
  // 基础配置
  BASE_URL: __DEV__ ? 'https://dev-api.seaart.com' : 'https://api.seaart.com',
  TIMEOUT: 30000,

  // API 版本
  VERSION: 'v1',

  // 请求头
  HEADERS: {
    CONTENT_TYPE: 'application/json',
    ACCEPT: 'application/json',
  },

  // 状态码
  STATUS_CODES: {
    SUCCESS: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    SERVER_ERROR: 500,
  },
} as const

// ==================== 存储相关常量 ====================
export const STORAGE_CONSTANTS = {
  // MMKV 键名
  KEYS: {
    USER_TOKEN: 'user_token',
    USER_INFO: 'user_info',
    USER_SETTINGS: 'user_settings',
    THEME_MODE: 'theme_mode',
    LANGUAGE: 'language',
    FIRST_LAUNCH: 'first_launch',
    CACHE_VERSION: 'cache_version',
  },

  // 缓存过期时间（毫秒）
  EXPIRE_TIME: {
    SHORT: 5 * 60 * 1000, // 5分钟
    MEDIUM: 30 * 60 * 1000, // 30分钟
    LONG: 24 * 60 * 60 * 1000, // 24小时
    WEEK: 7 * 24 * 60 * 60 * 1000, // 7天
  },
} as const

// ==================== 业务相关常量 ====================
export const BUSINESS_CONSTANTS = {
  // 用户相关
  USER: {
    MIN_USERNAME_LENGTH: 3,
    MAX_USERNAME_LENGTH: 20,
    MIN_PASSWORD_LENGTH: 6,
    MAX_PASSWORD_LENGTH: 20,
    MAX_BIO_LENGTH: 200,
  },

  // 文件上传
  UPLOAD: {
    MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
    ALLOWED_IMAGE_TYPES: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
    ALLOWED_VIDEO_TYPES: ['mp4', 'mov', 'avi'],
    MAX_IMAGES_COUNT: 9,
  },

  // 分页
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 20,
    MAX_PAGE_SIZE: 30,
  },
} as const

// ==================== 应用配置常量 ====================
export const APP_CONSTANTS = {
  // 应用信息
  INFO: {
    NAME: 'SeaArt',
    VERSION: '1.0.0',
    BUILD_NUMBER: '1',
    BUNDLE_ID: 'com.seaart.app',
  },

  // 环境配置
  ENV: {
    DEVELOPMENT: 'development',
    STAGING: 'staging',
    PRODUCTION: 'production',
  },

  // 第三方服务
  THIRD_PARTY: {
    SENTRY_DSN: __DEV__ ? '' : 'your-sentry-dsn',
    ANALYTICS_KEY: __DEV__ ? '' : 'your-analytics-key',
  },
} as const

// ==================== 错误消息常量 ====================
export const ERROR_MESSAGES = {
  NETWORK: {
    NO_CONNECTION: '网络连接失败，请检查网络设置',
    TIMEOUT: '请求超时，请稍后重试',
    SERVER_ERROR: '服务器错误，请稍后重试',
  },

  VALIDATION: {
    REQUIRED_FIELD: '此字段为必填项',
    INVALID_EMAIL: '请输入有效的邮箱地址',
    INVALID_PHONE: '请输入有效的手机号码',
    PASSWORD_TOO_SHORT: '密码长度至少6位',
    PASSWORD_TOO_LONG: '密码长度不能超过20位',
  },

  AUTH: {
    LOGIN_FAILED: '登录失败，请检查用户名和密码',
    TOKEN_EXPIRED: '登录已过期，请重新登录',
    PERMISSION_DENIED: '权限不足，无法访问',
  },
} as const

// ==================== 成功消息常量 ====================
export const SUCCESS_MESSAGES = {
  AUTH: {
    LOGIN_SUCCESS: '登录成功',
    LOGOUT_SUCCESS: '退出成功',
    REGISTER_SUCCESS: '注册成功',
  },

  OPERATION: {
    SAVE_SUCCESS: '保存成功',
    DELETE_SUCCESS: '删除成功',
    UPDATE_SUCCESS: '更新成功',
    UPLOAD_SUCCESS: '上传成功',
  },
} as const

// ==================== 正则表达式常量 ====================
export const REGEX_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^1[3-9]\d{9}$/,
  PASSWORD: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{6,}$/,
  USERNAME: /^[a-zA-Z0-9_]{3,20}$/,
  URL: /^https?:\/\/.+/,
  CHINESE: /[\u4e00-\u9fa5]/,
} as const

export const COMMON_COLOR = {
  COLOR_GRADIENT_THEME: ['#2FC5F4', '#4F97FF'],
}

// ==================== 导出所有常量 ====================
export const CONSTANTS = {
  API: API_CONSTANTS,
  STORAGE: STORAGE_CONSTANTS,
  BUSINESS: BUSINESS_CONSTANTS,
  APP: APP_CONSTANTS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  REGEX: REGEX_PATTERNS,
  COLOR: COMMON_COLOR,
} as const

// 默认导出
export default CONSTANTS
