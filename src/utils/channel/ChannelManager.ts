/**
 * @作者 东昊
 * @日期 2025/03/08
 * @用途 频道管理 - 支持单字段灰度管理，同时为多字段灰度做准备
 */
import { useChannelStore } from './useChannelStore'

// 灰度功能类型，默认是全局功能
export type FeatureKey = string
export const APPGRAY_FEATURE: FeatureKey = 'app_version_contral'

export const ChannelManager = {
  // 获取当前频道，默认获取APP灰度频道
  getChannel: (featureKey?: FeatureKey) => {
    try {
      // 如果不指定特殊功能，返回默认全局灰度状态
      if (!featureKey || featureKey === APPGRAY_FEATURE) {
        return useChannelStore.getState().channel
      }

      // 如果指定了特殊功能，尝试从featureChannels中获取
      return useChannelStore.getState().featureChannels[featureKey]
    } catch (error) {
      console.error('ChannelManager.getChannel encountered an error:', error)
      return null
    }
  },

  // 设置频道状态，默认设置APP灰度频道
  setChannel: (channel: Channel, featureKey?: FeatureKey) => {
    try {
      // 对传入的channel值进行校验
      if (channel !== 'A' && channel !== 'B') {
        console.warn(
          `ChannelManager.setChannel: received unexpected channel value:`,
          channel,
        )
      }

      // 如果不指定特殊功能，设置默认全局灰度状态
      if (!featureKey || featureKey === APPGRAY_FEATURE) {
        return useChannelStore.getState().setChannel(channel)
      }

      // 如果指定了特殊功能，设置特定功能的灰度状态
      return useChannelStore.getState().setFeatureChannel(featureKey, channel)
    } catch (error) {
      console.error('ChannelManager.setChannel encountered an error:', error)
    }
  },

  // 重置Channel Store
  resetChannelStore: () => {
    try {
      useChannelStore.getState().reset()
    } catch (error) {
      console.error('Error resetting channel store:', error)
    }
  },
}
