/**
 * @author 曼巴
 * @filename useNSFWSetting.ts
 * @date 2025-04-09 星期三
 * @description iOS端获取模糊图设置
 */
import { useState, useEffect, useCallback } from 'react'
import {
  NativeModules,
  NativeEventEmitter,
  Platform,
  AppStateStatus,
  AppState,
} from 'react-native'

const { NSFWSettingsModule } = NativeModules
const nsfwSettingsEmitter = new NativeEventEmitter(NSFWSettingsModule)

interface NSFWSettings {
  showNSFWContent: boolean
  showNSFWBlur: boolean
}

export const useNSFWSettings = () => {
  const [settings, setSettings] = useState<NSFWSettings>({
    showNSFWContent: false,
    showNSFWBlur: false,
  })

  const [isLoading, setIsLoading] = useState(true)

  const [appState, setAppState] = useState<AppStateStatus>(
    AppState.currentState,
  )

  // 加载设置的函数 - 提取为单独函数以便重用
  const loadSettings = useCallback(async () => {
    if (Platform.OS !== 'ios') {
      return
    }

    try {
      setIsLoading(true)
      const result = await NSFWSettingsModule.getNSFWSettings()
      const blurResult = await NSFWSettingsModule.getBlurSettings()

      setSettings({ ...result, ...blurResult })
    } catch (error) {
      console.error('Failed to load NSFW settings:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // 初始加载设置
  useEffect(() => {
    loadSettings()
  }, [loadSettings])

  // 监听应用状态变化
  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      // 当应用从后台切换到前台时重新获取设置
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        loadSettings()
      }

      setAppState(nextAppState)
    }

    // 添加应用状态监听器
    const appStateSubscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    )

    return () => {
      // 清理监听器
      appStateSubscription.remove()
    }
  }, [appState, loadSettings])

  // 监听设置变化
  useEffect(() => {
    if (Platform.OS !== 'ios') {
      return
    }

    const subscription = nsfwSettingsEmitter.addListener(
      'nsfwSettingsChanged',
      (newSettings: NSFWSettings) => {
        setSettings(newSettings)
      },
    )

    return () => {
      subscription.remove()
    }
  }, [])

  // 更新设置
  const updateNSFWSettings = async (showNSFW: boolean) => {
    if (Platform.OS === 'ios') {
      try {
        await NSFWSettingsModule.setNSFWSettings(showNSFW)
        setSettings({ ...settings, showNSFWContent: showNSFW })
        return true
      } catch (error) {
        console.error('Failed to update NSFW settings:', error)
        return false
      }
    }

    return false
  }

  // 更新设置
  const updateNSFWBlurSettings = async (showNSFWBlur: boolean) => {
    if (Platform.OS === 'ios') {
      try {
        await NSFWSettingsModule.setBlurSettings(showNSFWBlur)
        setSettings({ ...settings, showNSFWBlur: showNSFWBlur })
        return true
      } catch (error) {
        console.error('Failed to update NSFW settings:', error)
        return false
      }
    }

    return false
  }

  // 打开系统设置
  const openSystemSettings = () => {
    if (Platform.OS === 'ios') {
      NSFWSettingsModule.openSystemSettings()
    }
  }

  return {
    showNSFWContent: settings.showNSFWContent,
    showNSFWBlur: settings.showNSFWBlur,
    isLoading,
    updateNSFWSettings,
    updateNSFWBlurSettings,
    openSystemSettings,
  }
}
