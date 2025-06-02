/**
 * @作者 东昊
 * @日期 2025/03/08
 * @用途 频道管理
 */

import { MMKVStorage } from '@/utils/zustand/zustandStorage'
import { create } from 'zustand'
import {
  createJSONStorage,
  persist,
  subscribeWithSelector,
} from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

type State = {
  // APP灰度状态
  channel: Channel
  // 特定功能的灰度状态
  featureChannels: Record<string, Channel>
  // APP灰度是否发生过变化的标记
  _isChanged: boolean
  // 特定功能灰度是否发生过变化的标记
  _featureChanged: Record<string, boolean>
}

type Action = {
  // 设置APP灰度状态
  setChannel: (channel: Channel) => void
  // 设置特定功能的灰度状态
  setFeatureChannel: (featureKey: string, channel: Channel) => void
  // 重置store到初始状态
  reset: () => void
}

const initialState: State = {
  channel: 'A',
  featureChannels: {},
  _isChanged: false,
  _featureChanged: {},
}

export const useChannelStore = create<State & Action>()(
  subscribeWithSelector(
    persist(
      immer((set) => ({
        ...initialState,
        setChannel: (channel) =>
          set((draft) => {
            draft.channel = channel
            draft._isChanged = true
          }),
        setFeatureChannel: (featureKey, channel) =>
          set((draft) => {
            // 设置特定功能的灰度状态
            draft.featureChannels[featureKey] = channel
            // 标记该功能的灰度状态已变更
            draft._featureChanged[featureKey] = true
          }),
        // 新增重置方法
        reset: () => set(initialState),
      })),
      {
        name: 'channel-store',
        storage: createJSONStorage(() => MMKVStorage),
        partialize: (state) => ({
          channel: state.channel,
          featureChannels: state.featureChannels,
        }),
      },
    ),
  ),
)
