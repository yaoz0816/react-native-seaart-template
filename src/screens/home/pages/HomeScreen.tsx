/**
 * @filename HomeScreen.tsx
 * @description 首页组件
 */

import { tw } from '@/utils/twcss/twrnc'
import React from 'react'
import { SafeAreaView, ScrollView, Text, View } from 'react-native'

const HomeScreen: React.FC = () => {
  return (
    <SafeAreaView style={tw('flex-1 bg-gray-50')}>
      <ScrollView contentInsetAdjustmentBehavior={'automatic'}>
        <View style={tw('p-24 items-center')}>
          <Text style={tw('text-22 font-bold text-gray-800 mb-8 text-center')}>
            海艺 React Native 模板
          </Text>
          <Text
            style={tw('text-16 text-gray-600 text-center mb-32 leading-24')}>
            专为海艺团队打造的现代化开发模板
          </Text>

          <View style={tw('w-full bg-white rounded-12 p-20 mb-24 shadow-lg')}>
            <Text style={tw('text-18 font-semibold text-gray-700 mb-12')}>
              ✨ 已集成功能:
            </Text>
            <Text style={tw('text-14 text-gray-600 mb-8 leading-20')}>
              • React Native 0.76.9 + 新架构
            </Text>
            <Text style={tw('text-14 text-gray-600 mb-8 leading-20')}>
              • TypeScript 完整支持
            </Text>
            <Text style={tw('text-14 text-gray-600 mb-8 leading-20')}>
              • ESLint + Prettier 代码规范
            </Text>
            <Text style={tw('text-14 text-gray-600 mb-8 leading-20')}>
              • Expo Image 高性能图片组件
            </Text>
            <Text style={tw('text-14 text-gray-600 mb-8 leading-20')}>
              • FlashList 高性能列表
            </Text>
            <Text style={tw('text-14 text-gray-600 mb-8 leading-20')}>
              • Zustand 状态管理
            </Text>
            <Text style={tw('text-14 text-gray-600 mb-8 leading-20')}>
              • Axios 网络请求
            </Text>
            <Text style={tw('text-14 text-gray-600 mb-8 leading-20')}>
              • i18next 国际化
            </Text>
            <Text style={tw('text-14 text-gray-600 mb-8 leading-20')}>
              • Reanimated 动画库
            </Text>
            <Text style={tw('text-14 text-gray-600 mb-8 leading-20')}>
              • TailwindCSS 样式支持
            </Text>
          </View>

          <View
            style={tw(
              'w-full bg-blue-50 rounded-12 p-20 border-l-4 border-blue-500 mb-24',
            )}>
            <Text style={tw('text-18 font-semibold text-blue-800 mb-12')}>
              🚀 快速开始:
            </Text>
            <Text style={tw('text-14 text-blue-700 mb-8 leading-20')}>
              1. 运行 pnpm run setup YourProjectName
            </Text>
            <Text style={tw('text-14 text-blue-700 mb-8 leading-20')}>
              2. 在 src/ 目录下开始开发
            </Text>
            <Text style={tw('text-14 text-blue-700 mb-8 leading-20')}>
              3. 运行 pnpm run android/ios
            </Text>
          </View>

          <View
            style={tw('w-full items-center pt-20 border-t border-gray-200')}>
            <Text style={tw('text-14 text-gray-900 italic')}>
              海艺AI - 让创意触手可及
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen
