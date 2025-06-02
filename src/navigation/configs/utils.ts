/**
 * @author 曼巴
 * @filename utils.ts
 * @description 导航工具函数
 */

import {
  CommonActions,
  createNavigationContainerRef,
  StackActions,
} from '@react-navigation/native'
import { RootStackParamList, TabStackParamList } from '../types'

// 创建导航引用
export const navigationRef = createNavigationContainerRef<RootStackParamList>()

/**
 * 检查导航是否准备就绪
 */
export const isNavigationReady = (): boolean => navigationRef.isReady()

/**
 * 获取当前路由信息
 */
export const getCurrentRoute = () => {
  if (!isNavigationReady()) {
    return null
  }

  const route = navigationRef.getCurrentRoute()
  return {
    name: route?.name,
    params: route?.params,
  }
}

/**
 * 类型安全的导航函数
 */
export const navigate = <T extends keyof RootStackParamList>(
  screen: T,
  params?: RootStackParamList[T],
) => {
  if (!isNavigationReady()) {
    console.warn('Navigation is not ready')
    return
  }

  navigationRef.navigate(screen as any, params)
}

/**
 * 推入新屏幕到堆栈
 */
export const push = <T extends keyof RootStackParamList>(
  screen: T,
  params?: RootStackParamList[T],
) => {
  if (!isNavigationReady()) {
    console.warn('Navigation is not ready')
    return
  }

  navigationRef.dispatch(StackActions.push(screen, params))
}

/**
 * 替换当前屏幕
 */
export const replace = <T extends keyof RootStackParamList>(
  screen: T,
  params?: RootStackParamList[T],
) => {
  if (!isNavigationReady()) {
    console.warn('Navigation is not ready')
    return
  }

  navigationRef.dispatch(StackActions.replace(screen, params))
}

/**
 * 返回上一个屏幕
 */
export const goBack = () => {
  if (!isNavigationReady()) {
    console.warn('Navigation is not ready')
    return
  }

  if (navigationRef.canGoBack()) {
    navigationRef.goBack()
  }
}

/**
 * 弹出指定数量的屏幕
 */
export const pop = (count: number = 1) => {
  if (!isNavigationReady()) {
    console.warn('Navigation is not ready')
    return
  }

  navigationRef.dispatch(StackActions.pop(count))
}

/**
 * 弹出到堆栈顶部
 */
export const popToTop = () => {
  if (!isNavigationReady()) {
    console.warn('Navigation is not ready')
    return
  }

  navigationRef.dispatch(StackActions.popToTop())
}

/**
 * 重置导航堆栈
 */
export const reset = <T extends keyof RootStackParamList>(
  screen: T,
  params?: RootStackParamList[T],
) => {
  if (!isNavigationReady()) {
    console.warn('Navigation is not ready')
    return
  }

  navigationRef.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: screen, params }],
    }),
  )
}

/**
 * 导航到指定标签页
 */
export const navigateToTab = (screen: keyof TabStackParamList) => {
  navigate('MainTabs', { screen })
}

/**
 * 获取导航状态
 */
export const getNavigationState = () => {
  if (!isNavigationReady()) {
    return null
  }

  return navigationRef.getState()
}

// 导航事件类型
export type NavigationEventType =
  | 'navigate'
  | 'push'
  | 'replace'
  | 'goBack'
  | 'pop'
  | 'reset'

/**
 * 导航日志记录器（可选）
 */
export const logNavigation = (
  eventType: NavigationEventType,
  screenName: string,
  params?: any,
) => {
  if (__DEV__) {
    console.log(`[Navigation] ${eventType} -> ${screenName}`, params || '')
  }
}
