/**
 * @author 曼巴
 * @filename withSeaartPressEvents.tsx
 * @date 2024-08-04 星期天
 * @description 增强按钮组件，实现点击和滑动区别，防止滑动误触发
 * 解决用户在按下后很快滑动超过一定距离或时间,则认为这是一个滑动gesture而不是点击,于是取消onPress事件的触发。
 */

import { useNetInfo } from '@react-native-community/netinfo'
import { ComponentType, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { GestureResponderEvent } from 'react-native'
import { Toast } from 'react-native-toast-notifications'

type PressEventHandler = null | ((event: GestureResponderEvent) => void)

interface EnhancedTouchableProps {
  onPressIn?: PressEventHandler
  onPress?: PressEventHandler
  onPressOut?: PressEventHandler
  onLongPress?: PressEventHandler
}

export function withSeaartPressEvents<P extends EnhancedTouchableProps>(
  Component: ComponentType<P>,
) {
  const EnhancedTouchable = ({
    onLongPress,
    onPress,
    onPressIn,
    onPressOut,
    ...props
  }: P) => {
    ///保存触摸开始位置和时间
    const pressInPointRef = useRef({ startX: 0, startY: 0 })
    const pressInTimeRef = useRef<number>(0)
    const { isConnected } = useNetInfo()
    const { t } = useTranslation()

    ///记录触摸开始时间和位置
    const handlePressIn = (e: GestureResponderEvent) => {
      pressInPointRef.current.startX = e.nativeEvent.pageX
      pressInPointRef.current.startY = e.nativeEvent.pageY
      pressInTimeRef.current = new Date().getTime()
      onPressIn?.(e)
    }

    // 判断滑动距离(超过10px)或滑动时间(小于100ms)是否超过阈值，如果超过则阻止onPress事件的触发
    const handlePressOut = (e: GestureResponderEvent) => {
      const [startX, startY] = [e.nativeEvent.pageX, e.nativeEvent.pageY]

      const shouldReject =
        Math.abs(pressInPointRef.current.startX - startX) > 5 ||
        Math.abs(pressInPointRef.current.startY - startY) > 5

      if (shouldReject) {
        e.preventDefault()
        e.stopPropagation()
      }

      onPressOut?.(e)
    }

    // 先判断是否已经调用了e.preventDefault(),如果是则不再执行onPress回调
    const handlePress = (e: GestureResponderEvent) => {
      if (!isConnected) {
        Toast.show(t('NetworkError'), { placement: 'top' })
        return
      }

      if (e.isDefaultPrevented()) {
        return
      }

      onPress?.(e)
    }

    const handleLongPress = (e: GestureResponderEvent) => {
      if (!isConnected) {
        Toast.show(t('NetworkError'), { placement: 'top' })
        return
      }

      if (e.isDefaultPrevented()) {
        return
      }

      onLongPress?.(e)
    }

    return (
      <Component
        {...(props as P)}
        onPressIn={handlePressIn}
        onLongPress={handleLongPress}
        onPress={handlePress}
        onPressOut={handlePressOut}
      />
    )
  }

  return EnhancedTouchable
}
