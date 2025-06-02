/**
 * @filename api/types/index.ts
 * @description API接口类型定义统一管理
 */

// ==================== 方式1: 通配符批量导出 ====================
// 最简洁的方式 - 自动导出所有类型
export * from '../../types'
export * from './config'
export * from './request'
export * from './response'

// ==================== 方式2: 分类别名导出 ====================
// 为常用类型提供简短别名，提升开发体验

// 请求类型别名
export type {
  SystemConfigRequest as ConfigReq,
  EmailLoginRequest as LoginReq,
  UserSettingsUpdateRequest as SettingsReq,
} from './request'

// 响应类型别名
export type {
  LoginApiResponse as LoginRes,
  UserInfoApiResponse as UserRes,
} from './response'

// 配置类型别名
export type { ApiConfig as Config, FeatureFlags as Features } from './config'
