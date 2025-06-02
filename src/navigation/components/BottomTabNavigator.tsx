/**
 * @filename TabNavigator.tsx
 * @description 底部标签导航组件
 */

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React, { useMemo } from 'react'
import { Image, Text } from 'react-native'
import { tw } from '@/utils/twcss/twrnc'
import { TabStackParamList } from '../types'
// 导入屏幕组件
import ChatScreen from '@/screens/chat/pages/ChatScreen'
import CreateScreen from '@/screens/create/pages/CreateScreen'
import HomeScreen from '@/screens/home'
import MessageScreen from '@/screens/message/pages/MessageScreen'
import MineScreen from '@/screens/mine/MineScreen'

const Tab = createBottomTabNavigator<TabStackParamList>()

// 标签配置类型
interface TabConfig {
  name: keyof TabStackParamList
  component: React.ComponentType<any>
  label: string
  icon: {
    active: any
    inactive: any
  }
  badge?: number | string
}

// 主题配置
const THEME = {
  background: '#070B15',
  activeColor: '#FFFFFF',
  inactiveColor: '#4B4D53',
  badgeColor: '#FF4444',
} as const

// 图标资源
const ICON_RESOURCES = {
  HomePage: {
    active: require('@/assets/images/tabs/home_selected.webp'),
    inactive: require('@/assets/images/tabs/home.webp'),
  },
  ChatScreen: {
    active: require('@/assets/images/tabs/chat_selected.webp'),
    inactive: require('@/assets/images/tabs/chat.webp'),
  },
  CreateScreen: {
    active: require('@/assets/images/tabs/create_flow_selected.webp'),
    inactive: require('@/assets/images/tabs/create_flow.webp'),
  },
  MessageCenter: {
    active: require('@/assets/images/tabs/message_selected.webp'),
    inactive: require('@/assets/images/tabs/message.webp'),
  },
  Mine: {
    active: require('@/assets/images/tabs/me_selected.webp'),
    inactive: require('@/assets/images/tabs/me.webp'),
  },
} as const

// 标签配置
const TAB_CONFIGS: TabConfig[] = [
  {
    name: 'HomePage',
    component: HomeScreen,
    label: '首页',
    icon: ICON_RESOURCES.HomePage,
  },
  {
    name: 'ChatScreen',
    component: ChatScreen,
    label: '聊天',
    icon: ICON_RESOURCES.ChatScreen,
  },
  {
    name: 'CreateScreen',
    component: CreateScreen,
    label: '创作',
    icon: ICON_RESOURCES.CreateScreen,
  },
  {
    name: 'MessageCenter',
    component: MessageScreen,
    label: '消息',
    icon: ICON_RESOURCES.MessageCenter,
    badge: 12, // 示例徽章
  },
  {
    name: 'Mine',
    component: MineScreen,
    label: '我的',
    icon: ICON_RESOURCES.Mine,
  },
]

// 图标组件
interface TabIconProps {
  focused: boolean
  config: TabConfig
}

const TabIcon: React.FC<TabIconProps> = ({ focused, config }) => {
  const iconSource = focused ? config.icon.active : config.icon.inactive

  const iconStyle =
    config.name === 'CreateScreen' ? tw('h-33 w-42') : tw('h-22 w-22')

  return <Image source={iconSource} style={iconStyle} resizeMode={'cover'} />
}

// 标签文本组件
interface TabLabelProps {
  focused: boolean
  label: string
}

const TabLabel: React.FC<TabLabelProps> = ({ focused, label }) => (
  <Text style={tw(`text-10 ${focused ? 'text-white' : 'text-gray-500'}`)}>
    {label}
  </Text>
)

const BottomTabNavigator: React.FC = () => {
  // 屏幕选项配置
  const screenOptions = useMemo(
    () => ({
      lazy: true,
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: tw('bg-gray-900 border-t border-gray-800'),
      tabBarBadgeStyle: {
        backgroundColor: THEME.badgeColor,
        fontSize: 12,
        height: 20,
        width: 22,
        top: -6,
        left: 16,
      },
    }),
    [],
  )

  // 渲染标签屏幕
  const renderTabScreens = useMemo(() => {
    return TAB_CONFIGS.map((config) => (
      <Tab.Screen
        key={config.name}
        name={config.name}
        component={config.component}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} config={config} />
          ),
          tabBarLabel: ({ focused }) => (
            <TabLabel focused={focused} label={config.label} />
          ),
          tabBarBadge: config.badge,
        }}
      />
    ))
  }, [])

  return (
    <Tab.Navigator backBehavior={'history'} screenOptions={screenOptions}>
      {renderTabScreens}
    </Tab.Navigator>
  )
}

export default BottomTabNavigator
