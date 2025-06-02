/**
 * @filename ChatScreen.tsx
 * @description 聊天页面组件
 */

import { tw } from '@/utils/twcss/twrnc'
import React from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const ChatScreen: React.FC = () => {
  return (
    <SafeAreaView style={tw('flex-1 bg-gray-50')}>
      <View style={tw('flex-1 items-center justify-center')}>
        <Text style={tw('text-24 font-bold text-gray-800 mb-8')}>AI 聊天</Text>
        <Text style={tw('text-16 text-gray-600 text-center mx-16')}>
          与 AI 助手对话，获得创意灵感
        </Text>
        <View style={tw('mt-24 p-16 bg-blue-50 rounded-12')}>
          <Text style={tw('text-14 text-blue-700')}>
            🤖 AI 聊天功能即将上线
          </Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default ChatScreen
