/**
 * @filename index.ts
 * @description 主题系统统一导出
 * @author SeaArt Team
 */

// 主题提供者和Hook
export {
  ThemeProvider,
  useTheme,
  useColors,
  useIsDark,
  type ThemeMode,
} from './ThemeProvider'

// 主题定义
export { lightTheme, type Theme, type ThemeColors } from './themes/light'
export { darkTheme } from './themes/dark'

// 颜色Token
export {
  brandColors,
  neutralColors,
  functionalColors,
  alpha,
} from './tokens/colors'

// 主题工具
export { getThemeColor } from '../utils/twcss/twrnc'

// 导入用于创建样式函数
import { Theme } from './themes/light'

// 预设主题样式工具函数
export const createThemedStyles = (theme: Theme) => ({
  // 容器样式
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },

  // 卡片样式
  card: {
    backgroundColor: theme.colors.card.background,
    borderRadius: 12,
    padding: 16,
    shadowColor: theme.colors.card.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 4,
  },

  // 按钮样式
  button: {
    primary: {
      backgroundColor: theme.colors.primary,
      borderRadius: 8,
      paddingVertical: 12,
      paddingHorizontal: 24,
      alignItems: 'center' as const,
    },
    secondary: {
      backgroundColor: theme.colors.secondary,
      borderRadius: 8,
      paddingVertical: 12,
      paddingHorizontal: 24,
      alignItems: 'center' as const,
    },
  },

  // 文本样式
  text: {
    primary: {
      color: theme.colors.text.primary,
      fontSize: 16,
    },
    secondary: {
      color: theme.colors.text.secondary,
      fontSize: 14,
    },
    title: {
      color: theme.colors.text.primary,
      fontSize: 20,
      fontWeight: '600' as const,
    },
  },

  // 输入框样式
  input: {
    backgroundColor: theme.colors.input.background,
    borderWidth: 1,
    borderColor: theme.colors.input.border,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    color: theme.colors.text.primary,
  },

  // 分割线样式
  divider: {
    height: 1,
    backgroundColor: theme.colors.divider,
  },
})
