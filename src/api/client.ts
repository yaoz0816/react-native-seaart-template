/**
 * @filename client.ts
 * @date 2025-05-29 星期四
 * @description 全局公用配置接口
 */
import { ConfigReq } from '@/api/types/index'
import {
  ServiceConfigResponse,
  UserAssetsApiResponse,
  UserInfoApiResponse,
  VersionInfoApiResponse,
} from '@/api/types/response'
import { post } from '@/utils/http/request'

///查询版本信息
export const queryUpgradeVersion = (params: {
  app_id: string
}): Promise<VersionInfoApiResponse> => {
  return post('/api/v1/app/upgrade-version', params)
}

///白名单更新检测及服务端配置信息数据
export const checkServiceConfigInfo = (): Promise<ServiceConfigResponse> => {
  return post('/api/v1/are/you/ok')
}

///查询配置信息
export const queryConfig = (params?: ConfigReq) => {
  return post('/api/v1/config/get', params)
}

/**
 * 获取登陆用户个人信息
 */
export const getUserInfo = async (): Promise<UserInfoApiResponse> => {
  return await post('/api/v1/account/my')
}

///查询用户权益
export const queryAssets = (params?: any): Promise<UserAssetsApiResponse> => {
  return post('/api/v1/payment/assets/get', params)
}
