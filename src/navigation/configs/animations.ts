/**
 * @filename animations.ts
 * @description 导航动画配置 (简化版)
 */

import { NativeStackNavigationOptions } from '@react-navigation/native-stack'

// 默认屏幕选项
export const defaultScreenOptions: NativeStackNavigationOptions = {
  headerShown: false,
  gestureEnabled: true,
  animation: 'slide_from_right',
}

// 模态屏幕选项
export const modalScreenOptions: NativeStackNavigationOptions = {
  headerShown: false,
  gestureEnabled: true,
  presentation: 'modal',
  animation: 'slide_from_bottom',
}

// 淡入淡出选项
export const fadeScreenOptions: NativeStackNavigationOptions = {
  headerShown: false,
  gestureEnabled: false,
  animation: 'fade',
}

// 无动画选项
export const noAnimationOptions: NativeStackNavigationOptions = {
  headerShown: false,
  gestureEnabled: true,
  animation: 'none',
}
