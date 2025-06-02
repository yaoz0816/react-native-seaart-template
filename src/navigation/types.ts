/**
 * @author 曼巴
 * @filename types.ts
 * @date 2025-05-29 星期四
 * @description 导航相关类型定义
 */

import { NavigationProp, RouteProp } from '@react-navigation/native'

// 认证相关屏幕参数
export type AuthStackParamList = {
  WelcomePage: undefined
  LoginPage: undefined
  RegisterPage: undefined
}

// 主要标签页参数
export type TabStackParamList = {
  HomePage: undefined
  ChatScreen: undefined
  CreateScreen: undefined
  MessageCenter: undefined
  Mine: undefined
}

// 根导航堆栈参数
export type RootStackParamList = {
  // 认证相关
  WelcomePage: undefined
  LoginPage: undefined

  // 主要导航
  MainTabs:
    | {
        screen?: keyof TabStackParamList
        params?: TabStackParamList[keyof TabStackParamList]
      }
    | undefined

  // 模态页面
  SettingPage: undefined
  ChatScreen: undefined
  CreateScreen: undefined
  ButtonExamplesDemo: undefined
  NavigatorExamplesDemo: undefined
  ToastExamplesDemo: undefined
  TodoListDemo: undefined
  PagerViewDemo: undefined
  NavBarExamplesDemo: undefined
  ThemeExamplesDemo: undefined
  NavigationDetailDemo:
    | {
        title?: string
        message?: string
        userId?: string
        data?: any
        timestamp?: number
        callback?: (value: string) => void
      }
    | undefined
}

// 导航类型别名
export type RootNavigationProp = NavigationProp<RootStackParamList>
export type TabNavigationProp = NavigationProp<TabStackParamList>

// 路由类型别名
export type RootRouteProp<T extends keyof RootStackParamList> = RouteProp<
  RootStackParamList,
  T
>
export type TabRouteProp<T extends keyof TabStackParamList> = RouteProp<
  TabStackParamList,
  T
>

// 屏幕组件 Props 类型
export type ScreenProps<T extends keyof RootStackParamList> = {
  navigation: RootNavigationProp
  route: RootRouteProp<T>
}

// 标签页组件 Props 类型
export type TabScreenProps<T extends keyof TabStackParamList> = {
  navigation: TabNavigationProp
  route: TabRouteProp<T>
}

// 声明全局导航类型（用于类型检查）
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
