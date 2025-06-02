/**
 * @author 曼巴
 * @filename SeaArtGradientButton.tsx
 * @date 2023-11-15 Wednesday
 * @description 全局渐变按钮
 */
import { withSeaartPressEvents } from '@/components/hoc/withSeaartPressEvents'
import { COMMON_COLOR } from '@/config/constants'
import { TrackEventData } from '@/utils/track/TrackEventHelper'
import { TrackEventService } from '@/utils/track/TrackEventService'
import { tw } from '@/utils/twcss/twrnc'
import { LinearGradient } from 'expo-linear-gradient'
import debounce from 'lodash/debounce'
import { memo, ReactNode, useCallback, useMemo } from 'react'
import {
  ActivityIndicator,
  Pressable,
  StyleProp,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native'

type ButtonProps = {
  title?: string
  onPress: () => void
  colors?: [string, string, ...string[]]
  disabled?: boolean
  isLoading?: boolean
  children?: ReactNode
  style?: StyleProp<ViewStyle>
  containerStyle?: StyleProp<ViewStyle>
  fontStyle?: StyleProp<TextStyle>
  delay?: number
  trackData?: TrackEventData
}

const DISABLED_COLORS = ['#D9D9D9', '#D9D9D9'] as const
const RNPressable = withSeaartPressEvents(Pressable)

const SeaArtGradientButton = (props: ButtonProps) => {
  const {
    title,
    onPress,
    colors,
    disabled = false,
    isLoading = false,
    children,
    style,
    containerStyle,
    fontStyle,
    trackData,
    delay = 100,
  } = props

  // 确保colors符合LinearGradient的要求
  const gradientColors = useMemo(() => {
    if (disabled) {
      return DISABLED_COLORS
    }

    if (colors && colors.length < 2) {
      return [colors[0] || '#D9D9D9', '#D9D9D9'] as const
    }

    return (colors || COMMON_COLOR.COLOR_GRADIENT_THEME) as [
      string,
      string,
      ...string[],
    ]
  }, [colors, disabled])

  const handlePress = useCallback(() => {
    if (!isLoading && !disabled) {
      // 如果有trackData，执行打点
      if (trackData?.entityType && trackData?.entityName && !__DEV__) {
        TrackEventService.trackClick(trackData)
      }

      onPress()
    }
  }, [isLoading, disabled, onPress, trackData])

  const debouncedOnPress = useMemo(
    () => debounce(handlePress, delay),
    [handlePress, delay],
  )

  const buttonContent = useMemo(() => {
    if (isLoading) {
      return <ActivityIndicator size={'small'} color={'#FFF'} />
    }

    if (children) {
      return children
    }

    return (
      <Text style={[tw('text-16 text-white leading-20'), fontStyle]}>
        {title}
      </Text>
    )
  }, [isLoading, children, title, fontStyle])

  const buttonStyle = useMemo(
    () => [tw(`h-50 items-center justify-center`), style],
    [style],
  )

  const gradientStyle = useMemo(
    () => [
      tw('w-full h-full items-center justify-center rounded-full'),
      containerStyle,
    ],
    [containerStyle],
  )

  const pressableProps = useMemo(
    () => ({
      disabled: disabled || isLoading,
      style: buttonStyle,
      onPress: debouncedOnPress,
      android_ripple:
        disabled || isLoading
          ? undefined
          : { color: 'rgba(255, 255, 255, 0.1)' },
    }),
    [disabled, isLoading, buttonStyle, debouncedOnPress],
  )

  return (
    <RNPressable {...pressableProps}>
      <LinearGradient
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        colors={gradientColors}
        style={gradientStyle}>
        {buttonContent}
      </LinearGradient>
    </RNPressable>
  )
}

export default memo(SeaArtGradientButton)
