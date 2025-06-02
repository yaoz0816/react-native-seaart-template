/**
 * @filename colors.ts
 * @description 颜色设计 Token 系统
 * @author SeaArt Team
 */

// 基础色板 - 品牌色系
export const brandColors = {
  // 海艺主色系
  seaBlue: {
    50: '#E3F2FD',
    100: '#BBDEFB',
    200: '#90CAF9',
    300: '#64B5F6',
    400: '#42A5F5',
    500: '#2196F3', // 主色
    600: '#1E88E5',
    700: '#1976D2',
    800: '#1565C0',
    900: '#0D47A1',
  },

  // 辅助色系
  seaGreen: {
    50: '#E8F5E8',
    100: '#C8E6C9',
    200: '#A5D6A7',
    300: '#81C784',
    400: '#66BB6A',
    500: '#4CAF50', // 成功色
    600: '#43A047',
    700: '#388E3C',
    800: '#2E7D32',
    900: '#1B5E20',
  },

  // 警告色系
  seaOrange: {
    50: '#FFF3E0',
    100: '#FFE0B2',
    200: '#FFCC80',
    300: '#FFB74D',
    400: '#FFA726',
    500: '#FF9800', // 警告色
    600: '#FB8C00',
    700: '#F57C00',
    800: '#EF6C00',
    900: '#E65100',
  },

  // 错误色系
  seaRed: {
    50: '#FFEBEE',
    100: '#FFCDD2',
    200: '#EF9A9A',
    300: '#E57373',
    400: '#EF5350',
    500: '#F44336', // 错误色
    600: '#E53935',
    700: '#D32F2F',
    800: '#C62828',
    900: '#B71C1C',
  },
}

// 中性色板
export const neutralColors = {
  // 纯黑白
  black: '#000000',
  white: '#FFFFFF',

  // 灰度系列
  gray: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },

  // 蓝灰系列 (更现代的中性色)
  blueGray: {
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A',
  },
}

// 功能性颜色
export const functionalColors = {
  // 成功
  success: brandColors.seaGreen[500],
  successLight: brandColors.seaGreen[100],
  successDark: brandColors.seaGreen[700],

  // 警告
  warning: brandColors.seaOrange[500],
  warningLight: brandColors.seaOrange[100],
  warningDark: brandColors.seaOrange[700],

  // 错误
  error: brandColors.seaRed[500],
  errorLight: brandColors.seaRed[100],
  errorDark: brandColors.seaRed[700],

  // 信息
  info: brandColors.seaBlue[500],
  infoLight: brandColors.seaBlue[100],
  infoDark: brandColors.seaBlue[700],
}

// 透明度工具函数
export const alpha = (color: string, opacity: number): string => {
  // 如果是十六进制颜色，转换为 rgba
  if (color.startsWith('#')) {
    const r = parseInt(color.slice(1, 3), 16)
    const g = parseInt(color.slice(3, 5), 16)
    const b = parseInt(color.slice(5, 7), 16)
    return `rgba(${r}, ${g}, ${b}, ${opacity})`
  }

  return color
}

export default {
  brandColors,
  neutralColors,
  functionalColors,
  alpha,
}
