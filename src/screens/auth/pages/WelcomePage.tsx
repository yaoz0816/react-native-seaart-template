/**
 * @author 曼巴
 * @filename WelcomePage.tsx
 * @date 2025-05-29 星期四
 * @description 欢迎页面组件
 */

import { tw } from '@/utils/twcss/twrnc'
import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { navigate } from '@/navigation'

const WelcomePage: React.FC = () => {
  useEffect(() => {
    // 1秒后自动跳转到主页面
    const timer = setTimeout(() => {
      navigate('MainTabs')
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    <SafeAreaView style={tw('flex-1 bg-blue-500 items-center justify-center')}>
      <View style={tw('items-center')}>
        <Text style={tw('text-32 font-bold text-white mb-16')}>海艺 AI</Text>
        <Text style={tw('text-18 text-blue-100 text-center mb-32')}>
          让创意触手可及
        </Text>
        <View style={tw('w-16 h-16 bg-white/30 rounded-full')} />
      </View>
    </SafeAreaView>
  )
}

export default WelcomePage
