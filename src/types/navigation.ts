/**
 * @filename stack.d.ts
 * @description 导航堆栈相关类型定义
 */
type AuthLoginParamList = {
  LoginPage: undefined
  LoginMailPage: undefined
  WelcomePage: undefined
}

type MainStackParamList = {
  MainTabs:
    | {
        screen?: keyof TabParamList
        params?: {
          [key: string]: any
        }
      }
    | undefined
  HomePage: undefined
  ChatScreen: undefined
  Task: undefined
  MessageCenter: undefined
  Mine: undefined
  SettingPage: undefined
  CreateScreen: undefined
}

type TabParamList = {
  HomePage: undefined
  ChatScreen: undefined
  CreateScreen: undefined
  MessageCenter: undefined
  Mine: undefined
}

export type AppParamList = AuthLoginParamList & MainStackParamList
