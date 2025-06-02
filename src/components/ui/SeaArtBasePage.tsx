/**
 * @author 曼巴
 * @filename SeaArtBasePage.tsx
 * @date 2025-05-31 星期六
 * @description 基础页面组件-是对 SafeAreaView 的增强版本
 */
import OverlayView from '@/components/common/OverlayView'
import { useColors } from '@/theme'
import { tw } from '@/utils/twcss/twrnc'
import { memo } from 'react'
import { View, ViewProps } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type BasePageProps = {
  darkMode?: boolean
  backgroundColor?: string
  bgView?: React.ReactNode
  edges?: ('top' | 'bottom' | 'left' | 'right')[]
  disableSafeArea?: boolean
} & ViewProps

const SeaArtBasePage = memo((props: BasePageProps) => {
  const {
    bgView,
    children,
    style,
    edges = ['top', 'bottom'],
    disableSafeArea = false,
  } = props

  const insets = useSafeAreaInsets()
  const colors = useColors()

  const safeAreaStyle = disableSafeArea
    ? {}
    : {
        paddingTop: edges.includes('top') ? insets.top : 0,
        paddingBottom: edges.includes('bottom') ? insets.bottom : 0,
        paddingLeft: edges.includes('left') ? insets.left : 0,
        paddingRight: edges.includes('right') ? insets.right : 0,
      }

  return (
    <View
      style={[
        tw('flex-1'),
        { backgroundColor: colors.background },
        safeAreaStyle,
        style,
      ]}>
      <OverlayView>{bgView}</OverlayView>

      <View style={tw('flex-1')}>{children}</View>
    </View>
  )
})

export default SeaArtBasePage
