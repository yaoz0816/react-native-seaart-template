/**
 * @filename styles.d.ts
 * @description 样式类型定义
 */

import { ImageStyle, TextStyle, ViewStyle } from 'react-native'

// ==================== 统一样式类型 ====================

/**
 * 通用样式类型 - 合并 ViewStyle, TextStyle, ImageStyle 的公共属性
 */
export type CommonStyle = ViewStyle & TextStyle & ImageStyle

/**
 * 安全的样式属性类型 - 只包含兼容的属性
 */
export type SafeStyle = Omit<ViewStyle, 'transformOrigin'> &
  Omit<ImageStyle, 'transformOrigin'> & {
    transformOrigin?: string // 统一为 string 类型
  }

/**
 * 混合样式类型 - 支持 View 和 Image 的所有样式
 */
export type MixedStyle = Partial<ViewStyle & ImageStyle>

/**
 * 样式数组类型
 */
export type StyleArray<T = SafeStyle> = (T | undefined | null | false)[]

/**
 * 条件样式类型
 */
export type ConditionalStyle<T = SafeStyle> = T | undefined | null | false

/**
 * 样式组合类型
 */
export type CombinedStyle =
  | SafeStyle
  | StyleArray<SafeStyle>
  | ConditionalStyle<SafeStyle>

// ==================== 样式工具类型 ====================

/**
 * 提取样式属性类型
 */
export type StyleProps<T extends keyof SafeStyle> = Pick<SafeStyle, T>

/**
 * 排除特定样式属性
 */
export type OmitStyle<T extends keyof SafeStyle> = Omit<SafeStyle, T>

/**
 * 组件样式 Props 类型
 */
export interface ComponentStyleProps {
  style?: CombinedStyle
  containerStyle?: CombinedStyle
  contentStyle?: CombinedStyle
}

// ==================== 具体组件样式类型 ====================

/**
 * 按钮样式类型
 */
export interface ButtonStyleProps extends ComponentStyleProps {
  buttonStyle?: SafeStyle
  textStyle?: TextStyle
  iconStyle?: SafeStyle
}

/**
 * 输入框样式类型
 */
export interface InputStyleProps extends ComponentStyleProps {
  inputStyle?: TextStyle
  labelStyle?: TextStyle
  errorStyle?: TextStyle
}

/**
 * 卡片样式类型
 */
export interface CardStyleProps extends ComponentStyleProps {
  cardStyle?: SafeStyle
  headerStyle?: SafeStyle
  bodyStyle?: SafeStyle
  footerStyle?: SafeStyle
}
