/**
 * @作者 东昊
 * @日期 2024/03/19
 * @用途 通用SVG包裹组件，支持独立控制SVG的宽高和容器样式
 */
import React, { useMemo, memo } from 'react'
import {
  Pressable,
  PressableProps,
  ViewStyle,
  StyleProp,
  View,
  StyleSheet,
} from 'react-native'
import { SvgProps } from 'react-native-svg'

/**
 * SVG包裹器组件的属性接口
 * @interface SVGWrapperProps
 * @extends {PressableProps} 继承Pressable的所有属性
 * @property {React.ComponentType<SvgProps>} svg - SVG组件
 * @property {number} [svgWidth=16] - SVG图标的宽度，默认16
 * @property {number} [svgHeight=16] - SVG图标的高度，默认16
 * @property {string} [color='#000000'] - SVG的填充颜色，默认#000000
 * @property {StyleProp<ViewStyle>} [style] - 容器样式，应用于外层容器
 * @property {StyleProp<ViewStyle>} [svgStyle] - SVG的定位样式，直接应用于SVG元素
 */
interface SVGWrapperProps extends PressableProps {
  svg: React.ComponentType<SvgProps>
  svgWidth?: number
  svgHeight?: number
  color?: string
  style?: StyleProp<ViewStyle>
  svgStyle?: StyleProp<ViewStyle>
  stroke?: string
}

/**
 * SVG包裹器组件
 * 该组件提供了一个统一的方式来展示和控制SVG图标：
 * 1. 支持传入SVG组件
 * 2. 可独立控制SVG的尺寸和容器尺寸
 * 3. 根据是否有交互事件自动选择合适的容器类型
 * 4. 提供完整的样式自定义能力
 *
 * @component
 * @example
 * // 基础使用 - 仅展示
 * import HomeSvg from '@/assets/icons/home.svg'
 * <SVGWrapper
 *   svg={HomeSvg}
 *   style={{ marginRight: 8 }}
 * />
 *
 * // 自定义大小和颜色
 * import IconSvg from '@/assets/icons/icon.svg'
 * <SVGWrapper
 *   svg={IconSvg}
 *   svgWidth={30}
 *   svgHeight={30}
 *   color="#666666"
 *   style={{ marginRight: 8 }}
 * />
 *
 * // 带点击事件 - 自动转换为可点击元素
 * import ButtonSvg from '@/assets/icons/button.svg'
 * <SVGWrapper
 *   svg={ButtonSvg}
 *   onPress={() => console.log('pressed')}
 *   style={{ padding: 8 }}
 *   svgStyle={{ alignSelf: 'flex-start' }}
 * />
 */
export const SVGWrapper = memo<SVGWrapperProps>(
  ({
    svg: SVGComponent,
    svgWidth,
    svgHeight,
    color = '#000000',
    stroke,
    style,
    svgStyle,
    onPress,
    ...pressableProps
  }) => {
    // 确定容器类型
    const Container =
      onPress || Object.keys(pressableProps).length > 0 ? Pressable : View

    // 优化容器props
    const containerProps = useMemo(
      () => ({
        style: [styles.center, style],
        ...(onPress ? { onPress } : {}),
        ...pressableProps,
      }),
      [style, onPress, pressableProps],
    )

    // 优化SVG props，只在明确设置宽高时才传入
    const svgProps = useMemo(
      () => ({
        ...(svgWidth !== undefined ? { width: svgWidth } : {}),
        ...(svgHeight !== undefined ? { height: svgHeight } : {}),
        fill: color,
        stroke: stroke,
        style: [styles.center, svgStyle],
      }),
      [svgWidth, svgHeight, color, svgStyle, stroke],
    )

    return (
      <Container {...containerProps}>
        <SVGComponent {...svgProps} />
      </Container>
    )
  },
)

/**
 * 组件内部样式定义
 */
const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})
