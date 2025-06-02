/**
 * @filename dark.ts
 * @description 暗色主题配置
 * @author SeaArt Team
 */

import {
  brandColors,
  neutralColors,
  functionalColors,
  alpha,
} from '../tokens/colors'
import { Theme } from './light'

export const darkTheme: Theme = {
  // 主题标识
  isDark: true,

  // 主色系
  colors: {
    // 品牌主色
    primary: brandColors.seaBlue[400],
    primaryLight: brandColors.seaBlue[300],
    primaryDark: brandColors.seaBlue[600],
    primaryContainer: brandColors.seaBlue[800],
    onPrimary: neutralColors.black,
    onPrimaryContainer: brandColors.seaBlue[100],

    // 辅助色
    secondary: brandColors.seaGreen[400],
    secondaryLight: brandColors.seaGreen[300],
    secondaryDark: brandColors.seaGreen[600],
    secondaryContainer: brandColors.seaGreen[800],
    onSecondary: neutralColors.black,
    onSecondaryContainer: brandColors.seaGreen[100],

    // 背景色系
    background: neutralColors.blueGray[900],
    backgroundSecondary: neutralColors.blueGray[800],
    backgroundTertiary: neutralColors.blueGray[700],
    onBackground: neutralColors.gray[100],
    onBackgroundSecondary: neutralColors.gray[300],

    // 表面色系
    surface: neutralColors.blueGray[800],
    surfaceVariant: neutralColors.blueGray[700],
    surfaceContainer: neutralColors.blueGray[600],
    surfaceContainerHigh: neutralColors.blueGray[500],
    onSurface: neutralColors.gray[100],
    onSurfaceVariant: neutralColors.gray[400],

    // 大纲和边框
    outline: neutralColors.blueGray[500],
    outlineVariant: neutralColors.blueGray[600],

    // 功能性颜色
    success: brandColors.seaGreen[400],
    successContainer: brandColors.seaGreen[800],
    onSuccess: neutralColors.black,
    onSuccessContainer: brandColors.seaGreen[100],

    warning: brandColors.seaOrange[400],
    warningContainer: brandColors.seaOrange[800],
    onWarning: neutralColors.black,
    onWarningContainer: brandColors.seaOrange[100],

    error: brandColors.seaRed[400],
    errorContainer: brandColors.seaRed[800],
    onError: neutralColors.black,
    onErrorContainer: brandColors.seaRed[100],

    info: brandColors.seaBlue[400],
    infoContainer: brandColors.seaBlue[800],
    onInfo: neutralColors.black,
    onInfoContainer: brandColors.seaBlue[100],

    // 文本颜色
    text: {
      primary: neutralColors.gray[100],
      secondary: neutralColors.gray[300],
      tertiary: neutralColors.gray[400],
      disabled: neutralColors.gray[600],
      inverse: neutralColors.gray[900],
      placeholder: neutralColors.gray[500],
    },

    // 链接颜色
    link: brandColors.seaBlue[300],
    linkHover: brandColors.seaBlue[200],
    linkVisited: brandColors.seaBlue[400],

    // 阴影和遮罩
    shadow: alpha(neutralColors.black, 0.4),
    shadowLight: alpha(neutralColors.black, 0.2),
    shadowDark: alpha(neutralColors.black, 0.6),
    scrim: alpha(neutralColors.black, 0.6),
    backdrop: alpha(neutralColors.black, 0.7),

    // 分割线
    divider: neutralColors.blueGray[600],
    dividerLight: neutralColors.blueGray[700],

    // 输入组件
    input: {
      background: neutralColors.blueGray[800],
      border: neutralColors.blueGray[600],
      borderFocus: brandColors.seaBlue[400],
      borderError: brandColors.seaRed[400],
      placeholder: neutralColors.gray[500],
    },

    // 按钮状态
    button: {
      primaryPressed: brandColors.seaBlue[500],
      primaryDisabled: neutralColors.blueGray[600],
      secondaryPressed: neutralColors.blueGray[600],
      ghostPressed: alpha(brandColors.seaBlue[400], 0.16),
    },

    // 导航
    navigation: {
      background: neutralColors.blueGray[900],
      text: neutralColors.gray[100],
      textActive: brandColors.seaBlue[400],
      indicator: brandColors.seaBlue[400],
      border: neutralColors.blueGray[700],
    },

    // 卡片
    card: {
      background: neutralColors.blueGray[800],
      border: neutralColors.blueGray[600],
      shadow: alpha(neutralColors.black, 0.3),
    },

    // 状态栏
    statusBar: {
      style: 'light-content' as 'light-content',
      backgroundColor: neutralColors.blueGray[900],
    },
  },
}

export default darkTheme
