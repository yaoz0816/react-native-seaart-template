import { withSeaartPressEvents } from '@/components/hoc/withSeaartPressEvents'
import {
  TrackEventOptions,
  TrackEventService,
} from '@/utils/track/TrackEventService'
import { memo, useCallback } from 'react'
import {
  ColorValue,
  GestureResponderEvent,
  Pressable as RNPressable,
  PressableProps as RNPressableProps,
} from 'react-native'
import { PressableStateCallbackType } from 'react-native/Libraries/Components/Pressable/Pressable'
import { StyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet'
import { ViewStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes'

export type RePressableProps = {
  activeOpacity?: number
  underlayColor?: ColorValue
  trackData?: TrackEventOptions
  onPress?: () => void
} & RNPressableProps

const SeaartPressable = withSeaartPressEvents(RNPressable)

export const RePressable = memo((props: RePressableProps) => {
  const {
    children,
    style,
    activeOpacity = 0.3,
    underlayColor = 'transparent',
    trackData,
    onPress,
    ...otherProps
  } = props

  const _style = useCallback(
    (state: PressableStateCallbackType) => {
      return [
        style as StyleProp<ViewStyle>,
        ...(state.pressed ? [{ backgroundColor: underlayColor }] : [{}]),
        ...(state.pressed ? [{ opacity: activeOpacity }] : [{}]),
      ]
    },
    [activeOpacity, style, underlayColor],
  )

  // 处理点击事件和打点
  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      // 如果有trackData，执行打点
      if (trackData?.entityType && trackData?.entityName) {
        TrackEventService.trackClick({ ...trackData })
      }

      onPress?.(event)
    },
    [onPress, trackData],
  )

  return (
    <SeaartPressable style={_style} {...otherProps} onPress={handlePress}>
      {children}
    </SeaartPressable>
  )
})
