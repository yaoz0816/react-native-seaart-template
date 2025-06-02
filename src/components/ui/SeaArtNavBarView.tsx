/**
 * @author 曼巴
 * @filename SeaArtNavBarView.tsx
 * @date 2023-09-05 Tuesday
 * @description 自定义适配Android、iOS顶部导航适配
 */
import { tw } from '@/utils/twcss/twrnc'
import { memo } from 'react'
import {
  Platform,
  StyleProp,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native'

const NAV_BAR_HEIGHT_IOS = 44 as const //导航栏在iOS中的高度
const NAV_BAR_HEIGHT_ANDROID = 50 as const //导航栏在Android中的高度

export const NAV_BAR_HEIGHT = Platform.select({
  ios: NAV_BAR_HEIGHT_IOS,
  android: NAV_BAR_HEIGHT_ANDROID,
  default: NAV_BAR_HEIGHT_ANDROID,
})

type NavBarProps = {
  /** 容器样式 */
  style?: StyleProp<ViewStyle>
  /** 标题 */
  title?: string
  /** 标题视图 */
  titleView?: React.ReactNode
  /** 标题视图样式 */
  titleViewStyle?: StyleProp<ViewStyle>
  /** 右边视图 */
  rightView?: React.ReactNode
  /** 左边视图 */
  leftView?: React.ReactNode
  /** 标题样式 */
  titleStyle?: StyleProp<TextStyle>
  /** 指针事件 */
  pointerEvents?: 'box-none' | 'none' | 'box-only' | 'auto'
  /** 标题对齐方式 */
  titleAlign?: 'left' | 'center' | 'right'
  /** 背景颜色 */
  backgroundColor?: string
  /** 可访问性标签 */
  accessibilityLabel?: string
}

interface SideViewProps {
  children: React.ReactNode
  side: 'left' | 'right'
}

// 左右视图
const SideView: React.FC<SideViewProps> = memo(({ children, side }) => {
  if (!children) {
    return <View style={tw('w-16')} /> // 占位视图保持平衡
  }

  const sideStyle =
    side === 'left'
      ? 'items-start justify-center pl-16'
      : 'items-end justify-center pr-16'

  return (
    <View
      style={tw(`h-full min-w-16 ${sideStyle}`)}
      accessibilityRole={'button'}>
      {children}
    </View>
  )
})

const SeaArtNavBarView: React.FC<NavBarProps> = memo(
  ({
    style,
    title,
    titleView,
    leftView,
    rightView,
    titleViewStyle,
    titleStyle,
    pointerEvents,
    accessibilityLabel,
    backgroundColor = '#fff',
  }: NavBarProps) => {
    // 中间内容
    const TitleView = (
      <View
        style={[
          tw(
            `absolute bottom-0 left-40 right-40 top-0 items-center justify-center`,
          ),
          titleViewStyle,
        ]}
        pointerEvents={pointerEvents}>
        {titleView ?? (
          <Text
            numberOfLines={1}
            ellipsizeMode={'head'}
            style={[tw(`text-17 font-medium text-[#FFF]`), titleStyle]}>
            {title}
          </Text>
        )}
      </View>
    )

    const seaArtNavBarContent = (
      <View style={tw('h-full flex-row items-center justify-between')}>
        <SideView side={'left'}>{leftView}</SideView>
        {TitleView}
        <SideView side={'right'}>{rightView}</SideView>
      </View>
    )

    const containerStyle: StyleProp<ViewStyle> = [
      tw(`h-[${NAV_BAR_HEIGHT}px]`),
      { backgroundColor },
      style,
    ]

    return (
      <View style={containerStyle} accessibilityLabel={accessibilityLabel}>
        {seaArtNavBarContent}
      </View>
    )
  },
)

export default SeaArtNavBarView
