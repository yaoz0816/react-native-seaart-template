import { Dimensions, PixelRatio } from 'react-native'
import { create } from 'twrnc'
import { lightTheme } from '@/theme/themes/light'

// 获取屏幕宽度
const { width: screenWidth } = Dimensions.get('window')

// 设计基准宽度
const DESIGN_WIDTH = 375

// 计算缩放比例
const scale = screenWidth / DESIGN_WIDTH

// 缩放函数(用于动画等需要数值的场景)
const dp = (size: number): number => {
  return PixelRatio.roundToNearestPixel(size * scale)
}

// 生成指定范围的缩放值
const generateScaledValues = (max: number) => {
  return Array.from({ length: max + 1 }, (_, i) => i).reduce(
    (acc: Record<string, string>, i) => {
      acc[i.toString()] = dp(i).toString()
      return acc
    },
    {},
  )
}

// 生成带负值的缩放数组
const generateWithNegatives = (max: number) => {
  const values = generateScaledValues(max)

  // 添加负值
  for (let i = 1; i <= max; i++) {
    values[`-${i}`] = (-dp(i)).toString()
  }

  return values
}

// 将主题颜色扁平化为 tw 可用的格式
const flattenThemeColors = (
  colors: any,
  prefix = '',
): Record<string, string> => {
  const result: Record<string, string> = {}

  for (const [key, value] of Object.entries(colors)) {
    const colorKey = prefix ? `${prefix}-${key}` : key

    if (typeof value === 'string') {
      result[colorKey] = value
    } else if (typeof value === 'object' && value !== null) {
      Object.assign(result, flattenThemeColors(value, colorKey))
    }
  }

  return result
}

// 创建 tw 实例
const otw = create({
  theme: {
    extend: {
      colors: {
        // 保留原有颜色配置
        primary: '#24252A',
        accent: '#D6D7DC',
        placeholder: '#69737B',
        background: '#070B15',

        // 集成主题色系统
        ...flattenThemeColors(lightTheme.colors),

        // 快捷别名
        'theme-primary': lightTheme.colors.primary,
        'theme-secondary': lightTheme.colors.secondary,
        'theme-background': lightTheme.colors.background,
        'theme-surface': lightTheme.colors.surface,
        'theme-text-primary': lightTheme.colors.text.primary,
        'theme-text-secondary': lightTheme.colors.text.secondary,
        'theme-success': lightTheme.colors.success,
        'theme-warning': lightTheme.colors.warning,
        'theme-error': lightTheme.colors.error,
        'theme-info': lightTheme.colors.info,
      },

      // 布局相关属性使用完整范围(0-375)
      spacing: generateScaledValues(375),
      width: generateScaledValues(375),
      height: generateScaledValues(375),
      maxWidth: generateScaledValues(375),
      maxHeight: generateScaledValues(375),
      minWidth: generateScaledValues(375),
      minHeight: generateScaledValues(375),

      // 字体相关使用较小范围
      fontSize: {
        ...Array.from({ length: 101 }, (_, i) => i).reduce(
          (acc: Record<string, string>, i) => {
            acc[i.toString()] = dp(i).toString() + 'px'
            return acc
          },
          {},
        ),
      },
      lineHeight: {
        ...Array.from({ length: 101 }, (_, i) => i).reduce(
          (acc: Record<string, string>, i) => {
            acc[i.toString()] = dp(i).toString() + 'px'
            return acc
          },
          {},
        ),
      },
      letterSpacing: generateWithNegatives(20),

      // 边框相关使用更小范围
      borderWidth: generateScaledValues(20),
      borderRadius: generateScaledValues(100),

      // 间距和定位相关
      gap: generateScaledValues(100),
      inset: generateWithNegatives(100),

      // 弹性布局
      flexBasis: generateScaledValues(100),
    },
  },
})

const tw = otw.style
const color = otw.color

// 主题相关的工具函数
export const getThemeColor = (colorPath: string, theme = lightTheme) => {
  const keys = colorPath.split('.')
  let result: any = theme.colors

  for (const key of keys) {
    result = result?.[key]
  }

  return typeof result === 'string' ? result : '#000000'
}

// 导出dp函数用于动画值计算
export { tw, otw, color, dp, flattenThemeColors }

// 类型定义
export type TWStyle = ReturnType<typeof tw>
export type TWColor = ReturnType<typeof color>
