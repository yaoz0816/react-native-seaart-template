/**
 * @filename light.ts
 * @description 亮色主题配置
 * @author SeaArt Team
 */

import {
  brandColors,
  neutralColors,
  functionalColors,
  alpha,
} from '../tokens/colors'

export const lightTheme = {
  // 主题标识
  isDark: false,

  // 主色系
  colors: {
    // 品牌主色
    primary: brandColors.seaBlue[500],
    primaryLight: brandColors.seaBlue[400],
    primaryDark: brandColors.seaBlue[600],
    primaryContainer: brandColors.seaBlue[50],
    onPrimary: neutralColors.white,
    onPrimaryContainer: brandColors.seaBlue[900],

    // 辅助色
    secondary: brandColors.seaGreen[500],
    secondaryLight: brandColors.seaGreen[400],
    secondaryDark: brandColors.seaGreen[600],
    secondaryContainer: brandColors.seaGreen[50],
    onSecondary: neutralColors.white,
    onSecondaryContainer: brandColors.seaGreen[900],

    // 背景色系
    background: neutralColors.white,
    backgroundSecondary: neutralColors.gray[50],
    backgroundTertiary: neutralColors.gray[100],
    onBackground: neutralColors.gray[900],
    onBackgroundSecondary: neutralColors.gray[700],

    // 表面色系
    surface: neutralColors.white,
    surfaceVariant: neutralColors.gray[50],
    surfaceContainer: neutralColors.gray[100],
    surfaceContainerHigh: neutralColors.gray[200],
    onSurface: neutralColors.gray[900],
    onSurfaceVariant: neutralColors.gray[600],

    // 大纲和边框
    outline: neutralColors.gray[300],
    outlineVariant: neutralColors.gray[200],

    // 功能性颜色
    success: functionalColors.success,
    successContainer: functionalColors.successLight,
    onSuccess: neutralColors.white,
    onSuccessContainer: functionalColors.successDark,

    warning: functionalColors.warning,
    warningContainer: functionalColors.warningLight,
    onWarning: neutralColors.white,
    onWarningContainer: functionalColors.warningDark,

    error: functionalColors.error,
    errorContainer: functionalColors.errorLight,
    onError: neutralColors.white,
    onErrorContainer: functionalColors.errorDark,

    info: functionalColors.info,
    infoContainer: functionalColors.infoLight,
    onInfo: neutralColors.white,
    onInfoContainer: functionalColors.infoDark,

    // 文本颜色
    text: {
      primary: neutralColors.gray[900],
      secondary: neutralColors.gray[600],
      tertiary: neutralColors.gray[500],
      disabled: neutralColors.gray[400],
      inverse: neutralColors.white,
      placeholder: neutralColors.gray[400],
    },

    // 链接颜色
    link: brandColors.seaBlue[600],
    linkHover: brandColors.seaBlue[700],
    linkVisited: brandColors.seaBlue[800],

    // 阴影和遮罩
    shadow: alpha(neutralColors.black, 0.15),
    shadowLight: alpha(neutralColors.black, 0.08),
    shadowDark: alpha(neutralColors.black, 0.25),
    scrim: alpha(neutralColors.black, 0.32),
    backdrop: alpha(neutralColors.black, 0.4),

    // 分割线
    divider: neutralColors.gray[200],
    dividerLight: neutralColors.gray[100],

    // 输入组件
    input: {
      background: neutralColors.white,
      border: neutralColors.gray[300],
      borderFocus: brandColors.seaBlue[500],
      borderError: functionalColors.error,
      placeholder: neutralColors.gray[400],
    },

    // 按钮状态
    button: {
      primaryPressed: brandColors.seaBlue[600],
      primaryDisabled: neutralColors.gray[300],
      secondaryPressed: neutralColors.gray[100],
      ghostPressed: alpha(brandColors.seaBlue[500], 0.08),
    },

    // 导航
    navigation: {
      background: neutralColors.white,
      text: neutralColors.gray[900],
      textActive: brandColors.seaBlue[500],
      indicator: brandColors.seaBlue[500],
      border: neutralColors.gray[200],
    },

    // 卡片
    card: {
      background: neutralColors.white,
      border: neutralColors.gray[200],
      shadow: alpha(neutralColors.black, 0.08),
    },

    // 状态栏
    statusBar: {
      style: 'dark-content' as 'dark-content' | 'light-content',
      backgroundColor: neutralColors.white,
    },
  },
}

export type ThemeColors = typeof lightTheme.colors
export type Theme = typeof lightTheme

export default lightTheme
