/**
 * @author 曼巴
 * @filename index.ts
 * @description 导航模块统一导出
 */

// 导航组件
export { default as AppNavigator } from './components/AppNavigator'
export { default as TabNavigator } from './components/BottomTabNavigator'

// 类型定义
export type {
  AuthStackParamList,
  RootNavigationProp,
  RootRouteProp,
  RootStackParamList,
  ScreenProps,
  TabNavigationProp,
  TabRouteProp,
  TabScreenProps,
  TabStackParamList,
} from './types'

// 导航工具函数
export {
  getCurrentRoute,
  getNavigationState,
  goBack,
  isNavigationReady,
  logNavigation,
  navigate,
  navigateToTab,
  navigationRef,
  pop,
  popToTop,
  push,
  replace,
  reset,
} from './configs/utils'

// 动画配置
export {
  defaultScreenOptions,
  fadeScreenOptions,
  modalScreenOptions,
  noAnimationOptions,
} from './configs/animations'
