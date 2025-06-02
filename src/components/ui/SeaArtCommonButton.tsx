/**
 * @author 曼巴
 * @filename SeaArtCommonButton.tsx
 * @date 2023-07-17 Tuesday
 * @description 全局通用按钮
 */

import { TrackEventData } from '@/utils/track/TrackEventHelper'
import { tw } from '@/utils/twcss/twrnc'
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
import { TrackEventService } from '@/utils/track/TrackEventService'
import { withSeaartPressEvents } from '@/components/hoc/withSeaartPressEvents'

type ButtonProps = {
  title?: string
  onPress: () => void
  onLongPress?: () => void
  disabled?: boolean
  isLoading?: boolean
  customerLoadingView?: ReactNode
  activeOpacity?: number
  delay?: number
  authButton?: boolean
  children?: ReactNode
  style?: StyleProp<ViewStyle>
  fontStyle?: StyleProp<TextStyle>
  trackData?: TrackEventData
}

const RNPressable = withSeaartPressEvents(Pressable)

const SeaArtCommonButton = (props: ButtonProps) => {
  const {
    title,
    onPress,
    onLongPress,
    disabled = false,
    isLoading = false,
    customerLoadingView,
    delay = 100,
    children,
    style,
    fontStyle,
    trackData,
  } = props

  const onBtnPress = useCallback(() => {
    if (!isLoading && !disabled && onPress) {
      if (trackData?.entityType && trackData?.entityName && !__DEV__) {
        TrackEventService.trackClick(trackData)
      }

      onPress()
    }
  }, [isLoading, disabled, onPress, trackData])

  const debouncedOnPress = useMemo(
    () => debounce(onBtnPress, delay),
    [onBtnPress, delay],
  )

  const loadingIndicator = useMemo(
    () =>
      customerLoadingView || (
        <ActivityIndicator size={'small'} color={'#8CBBFF'} />
      ),
    [customerLoadingView],
  )

  const buttonContent = useMemo(() => {
    if (isLoading) {
      return loadingIndicator
    }

    if (children) {
      return children
    }

    return (
      <Text style={[tw('text-16 leading-26 text-[#fff]'), fontStyle]}>
        {title}
      </Text>
    )
  }, [isLoading, loadingIndicator, children, title, fontStyle])

  return (
    <RNPressable
      disabled={disabled || isLoading}
      style={[tw('h-[50px] items-center justify-center'), style]}
      onPress={debouncedOnPress}
      onLongPress={onLongPress}>
      {buttonContent}
    </RNPressable>
  )
}

export default memo(SeaArtCommonButton)
