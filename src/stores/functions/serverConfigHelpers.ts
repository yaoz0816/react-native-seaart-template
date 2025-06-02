/**
 * @author 曼巴
 * @filename serverConfigHelpers.ts
 * @date 2025-04-08 星期二
 * @description 服务端配置帮助函数
 */
import { ChannelManager } from '@/utils/channel/ChannelManager'
import { setGlobalHeaders } from '@/utils/http/interceptors'
import { mmkv } from '@/utils/mmkv/StorageMMKV'
import * as Localization from 'expo-localization'

// 配置类型
export type Channel = 'A' | 'B' | 'C'
export interface ServerConfig {
  app_canary_prev?: string
  app_character_recommend?: string
  app_version_contral?: string
  app_home_gary?: string
  app_homepage_quick_entry_traffic_control?: string
  [key: string]: any
}

/**
 * 检查是否应该刷新服务器配置
 * @returns 是否需要刷新
 */
export const shouldRefreshServerConfig = (): boolean => {
  const now = Date.now()
  const lastRequestTime = mmkv.getNumber('server_config_last_request') || 0
  const shouldRefresh = now - lastRequestTime >= 60000 * 10 // 10分钟刷新一次

  if (shouldRefresh) {
    mmkv.set('server_config_last_request', now)
  }

  return shouldRefresh
}

/**
 * 应用所有服务器配置
 * @param config 服务器配置对象
 */
export const applyServerConfigurations = (config: ServerConfig): void => {
  // 1. 应用环境配置
  applyEnvironmentConfig(config)

  // 2. 应用推荐状态配置
  applyRecommendConfig(config)

  // 3. 设置时区
  setTimezone()

  // 4. 设置版本控制
  applyVersionControl(config)

  // 5. 设置首页灰度
  applyHomeGrayTest(config)

  // 6. 设置签到灰度
  applySignInGrayTest(config)

  // 7. 设置数字人首页灰度呈现
  applyDigitalHomeGrayDisplay(config)
}

/**
 * 应用环境配置（预发布/灰度）
 */
const applyEnvironmentConfig = (value: ServerConfig): void => {
  const canary = 'app_canary_prev' in value ? value.app_canary_prev : ''

  const headers: Record<string, string> = {}

  switch (canary) {
    case 'B': // 预发布
      headers['X-Gray-Release'] = 'true'
      break
    case 'C': // 灰度
      headers['x-canary'] = 'true'
      break
  }

  if (Object.keys(headers).length > 0) {
    setGlobalHeaders(headers)
  }
}

/**
 * 应用推荐状态配置
 */
const applyRecommendConfig = (value: ServerConfig): void => {
  // const isRecommend =
  //   'app_character_recommend' in value
  //     ? value.app_character_recommend === 'A'
  //     : false
  // useCharacterStore.getState().setIsRecommend(isRecommend)
}

/**
 * 设置时区头信息
 */
const setTimezone = (): void => {
  const timeZone = Localization.getCalendars()[0].timeZone

  if (timeZone) {
    setGlobalHeaders({
      'X-Timezone': timeZone,
    })
  }
}

/**
 * 应用版本控制配置
 */
const applyVersionControl = (value: ServerConfig): void => {
  const appVersionControl =
    typeof value.app_version_contral === 'string'
      ? (value.app_version_contral as Channel)
      : 'A'

  ChannelManager.setChannel(appVersionControl)
}

/**
 * 应用首页灰度测试配置
 */
const applyHomeGrayTest = (value: ServerConfig): void => {
  const homeGray =
    typeof value.app_homepage_quick_entry_traffic_control === 'string'
      ? (value.app_homepage_quick_entry_traffic_control as Channel)
      : 'A'

  // 记录灰度测试事件
  const eventMap: Record<Channel, string> = {
    A: 'homepage_test_A',
    B: 'homepage_test_B',
    C: 'homepage_test_C',
  }

  if (eventMap[homeGray]) {
    // SeaartTrackEvent.grayTest(eventMap[homeGray])
  }

  ChannelManager.setChannel(homeGray, 'home')
}

/**
 * 应用签到灰度配置
 */
const applySignInGrayTest = (value: ServerConfig): void => {
  const signInGray =
    typeof value.app_checkin_traffic_control === 'string'
      ? (value.app_checkin_traffic_control as Channel)
      : 'A'

  ChannelManager.setChannel(signInGray, 'signIn')
}

/**
 * 数字人首页灰度呈现
 */
const applyDigitalHomeGrayDisplay = (value: ServerConfig): void => {
  const digitalHomeGrayVal =
    typeof value.app_character_homepage_traffic_control === 'string'
      ? (value.app_character_homepage_traffic_control as Channel)
      : 'A'

  ChannelManager.setChannel(digitalHomeGrayVal, 'DigitalHomeGrayDisplay')
}
