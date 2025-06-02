/**
 * @author 曼巴
 * @filename SeaArtProviderToast.tsx
 * @date 2023-10-26 Thursday
 * @description 自定义全局通知toast
 */

import { tw } from '@/utils/twcss/twrnc'
import { ToastProvider, useToast } from 'react-native-toast-notifications'
import { Image, View, Text } from 'react-native'
import AnimatedLottieView from 'lottie-react-native'
import React, { useEffect } from 'react'
import { toastManager } from '@/utils/toast/ToastManager'

export enum TOAST_TYPE {
  NORMAL = 'normal',
  SUCCESS = 'success',
  FAILURE = 'failure',
  WARNING = 'warning',
  LOADING = 'loading',
}

type IProps = {
  children: React.ReactNode
  type?: TOAST_TYPE
  placement?: 'center' | 'bottom' | 'top'
  duration?: number
  offset?: number
  animationType?: 'slide-in' | 'zoom-in'
  normalColor?: string
  icon?: string
}

// Toast管理器初始化组件
const ToastManagerInit = () => {
  const toast = useToast()

  useEffect(() => {
    // 将toast hook注册到管理器
    toastManager.setToastHook(toast)
  }, [toast])

  return null
}

const SeaArtProviderToast = ({
  children,
  type = TOAST_TYPE.NORMAL,
  placement = 'center',
  duration = 1000,
  offset = 0,
  animationType = 'slide-in',
  normalColor = '#000',
  icon,
}: IProps) => {
  return (
    <ToastProvider
      type={type}
      placement={placement}
      duration={duration}
      animationType={animationType}
      normalColor={normalColor}
      offsetTop={offset}
      renderType={{
        normal: (toast) => (
          <View
            style={tw(
              'bg-[#111] px-30 py-15 w-[65%] rounded-10 justify-center items-center',
            )}>
            <Text
              style={tw('text-14 text-white text-center')}
              ellipsizeMode={'tail'}
              numberOfLines={4}>
              {toast.message}
            </Text>
          </View>
        ),
        loading: (toast) => (
          <View
            style={tw(
              'bg-black/80 rounded-16 items-center self-center w-180 py-40 px-10',
            )}>
            <AnimatedLottieView
              autoPlay
              useNativeLooping
              loop
              source={require('@/assets/animation/loading.json')}
              style={tw('w-60 h-60')}
            />
            {!!toast.message && (
              <Text
                style={tw('text-white text-14 text-center')}
                numberOfLines={2}>
                {toast.message}
              </Text>
            )}
          </View>
        ),
        success: (toast) => (
          <View
            style={tw(
              'w-180 py-40 px-10 bg-black/80 rounded-16 items-center self-center',
            )}>
            <Image
              source={icon || require('@/assets/icons/webp/icon_success.webp')}
              style={tw('w-40 h-40')}
            />
            <Text
              style={tw('text-white text-14 text-center')}
              numberOfLines={2}>
              {toast.message}
            </Text>
          </View>
        ),
        failure: (toast) => (
          <View
            style={tw(
              'w-180 py-40 px-10 bg-black/80 rounded-16 items-center self-center ',
            )}>
            <Image
              source={icon || require('@/assets/icons/webp/icon_error.webp')}
              style={tw('w-40 h-40')}
            />
            <Text
              style={tw('text-white text-14 text-center')}
              numberOfLines={2}>
              {toast.message}
            </Text>
          </View>
        ),
      }}>
      <ToastManagerInit />
      {children}
    </ToastProvider>
  )
}

export default SeaArtProviderToast
