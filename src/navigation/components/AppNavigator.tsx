/**
 * @filename RootNavigator.tsx
 * @description 根导航组件
 */

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import {
  defaultScreenOptions,
  modalScreenOptions,
  noAnimationOptions,
} from '@/navigation/configs/animations'
import TabNavigator from '@/navigation/components/BottomTabNavigator'
import { RootStackParamList } from '@/navigation/types'
import { navigationRef } from '@/navigation/configs/utils'
// 导入屏幕组件
import WelcomePage from '@/screens/auth/pages/WelcomePage'
import ChatScreen from '@/screens/chat/pages/ChatScreen'
import CreateScreen from '@/screens/create/pages/CreateScreen'
import SettingPage from '@/screens/mine/SettingPage'
import {
  PagerViewDemo,
  TodoListDemo,
  ToastExamplesDemo,
  NavigationDetailDemo,
  NavigatorExamplesDemo,
  NavBarExamplesDemo,
} from '@/screens/example'
import ButtonExamplesDemo from '@/screens/example/pages/ButtomExamplesDemo'
import ThemeExamplesDemo from '@/screens/example/pages/ThemeExamplesDemo'

const Stack = createNativeStackNavigator<RootStackParamList>()

// 屏幕配置
const SCREEN_CONFIGS = [
  {
    name: 'WelcomePage' as const,
    component: WelcomePage,
    options: defaultScreenOptions,
  },
  {
    name: 'MainTabs' as const,
    component: TabNavigator,
    options: defaultScreenOptions,
  },
  {
    name: 'SettingPage' as const,
    component: SettingPage,
    options: modalScreenOptions,
  },
  {
    name: 'ChatScreen' as const,
    component: ChatScreen,
    options: modalScreenOptions,
  },
  {
    name: 'CreateScreen' as const,
    component: CreateScreen,
    options: modalScreenOptions,
  },
  {
    name: 'ButtonExamplesDemo' as const,
    component: ButtonExamplesDemo,
    options: modalScreenOptions,
  },
  {
    name: 'NavigatorExamplesDemo' as const,
    component: NavigatorExamplesDemo,
    options: noAnimationOptions,
  },
  {
    name: 'NavBarExamplesDemo' as const,
    component: NavBarExamplesDemo,
    options: noAnimationOptions,
  },
  {
    name: 'NavigationDetailDemo' as const,
    component: NavigationDetailDemo,
    options: noAnimationOptions,
  },
  {
    name: 'ToastExamplesDemo' as const,
    component: ToastExamplesDemo,
    options: noAnimationOptions,
  },
  {
    name: 'TodoListDemo' as const,
    component: TodoListDemo,
    options: noAnimationOptions,
  },
  {
    name: 'PagerViewDemo' as const,
    component: PagerViewDemo,
    options: noAnimationOptions,
  },
  {
    name: 'ThemeExamplesDemo' as const,
    component: ThemeExamplesDemo,
    options: noAnimationOptions,
  },
] as const

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName={'WelcomePage'}
        screenOptions={defaultScreenOptions}>
        {SCREEN_CONFIGS.map(({ name, component, options }) => (
          <Stack.Screen
            key={name}
            name={name}
            component={component}
            options={options}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator
