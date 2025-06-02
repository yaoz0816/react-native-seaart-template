/**
 * @filename ThemeProvider.tsx
 * @description 主题提供者组件 - 管理全局主题状态
 * @author SeaArt Team
 */

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react'
import { Appearance, ColorSchemeName, StatusBar } from 'react-native'
import { MMKV } from 'react-native-mmkv'
import { lightTheme, Theme } from './themes/light'
import { darkTheme } from './themes/dark'

// 主题类型
export type ThemeMode = 'light' | 'dark' | 'system'

// 主题上下文类型
interface ThemeContextType {
  theme: Theme
  isDark: boolean
  themeMode: ThemeMode
  setThemeMode: (mode: ThemeMode) => void
  toggleTheme: () => void
}

// MMKV 存储实例
const storage = new MMKV({
  id: 'theme-storage',
  encryptionKey: 'seaart-theme-key',
})

// 存储键
const THEME_MODE_KEY = 'theme-mode'

// 创建主题上下文
const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

// 获取存储的主题模式
const getStoredThemeMode = (): ThemeMode => {
  const stored = storage.getString(THEME_MODE_KEY)
  return (stored as ThemeMode) || 'system'
}

// 保存主题模式
const saveThemeMode = (mode: ThemeMode) => {
  storage.set(THEME_MODE_KEY, mode)
}

// 根据系统主题和用户设置获取实际主题
const getEffectiveTheme = (
  mode: ThemeMode,
  systemColorScheme: ColorSchemeName,
): Theme => {
  if (mode === 'system') {
    return systemColorScheme === 'dark' ? darkTheme : lightTheme
  }

  return mode === 'dark' ? darkTheme : lightTheme
}

interface ThemeProviderProps {
  children: ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [themeMode, setThemeModeState] = useState<ThemeMode>(getStoredThemeMode)

  const [systemColorScheme, setSystemColorScheme] = useState<ColorSchemeName>(
    Appearance.getColorScheme(),
  )

  // 计算当前有效主题
  const theme = getEffectiveTheme(themeMode, systemColorScheme)
  const isDark = theme.isDark

  // 监听系统主题变化
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setSystemColorScheme(colorScheme)
    })

    return () => subscription.remove()
  }, [])

  // 更新状态栏样式
  useEffect(() => {
    StatusBar.setBarStyle(theme.colors.statusBar.style, true)
    StatusBar.setBackgroundColor(theme.colors.statusBar.backgroundColor, true)
  }, [theme])

  // 设置主题模式
  const setThemeMode = (mode: ThemeMode) => {
    setThemeModeState(mode)
    saveThemeMode(mode)

    console.log(`🎨 主题切换: ${mode}`, {
      mode,
      systemColorScheme,
      effectiveTheme: getEffectiveTheme(mode, systemColorScheme).isDark
        ? 'dark'
        : 'light',
    })
  }

  // 切换主题 (在 light 和 dark 之间切换)
  const toggleTheme = () => {
    const newMode = isDark ? 'light' : 'dark'
    setThemeMode(newMode)
  }

  const contextValue: ThemeContextType = {
    theme,
    isDark,
    themeMode,
    setThemeMode,
    toggleTheme,
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  )
}

// 主题 Hook
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }

  return context
}

// 颜色 Hook - 方便直接获取颜色
export const useColors = () => {
  const { theme } = useTheme()
  return theme.colors
}

// 主题检测 Hook
export const useIsDark = () => {
  const { isDark } = useTheme()
  return isDark
}

export default ThemeProvider
