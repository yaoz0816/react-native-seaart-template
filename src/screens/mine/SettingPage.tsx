/**
 * @author 曼巴
 * @filename SettingPage.tsx
 * @date 2025-05-29 星期四
 * @description 设置页面
 */

import { tw } from '@/utils/twcss/twrnc'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import SeaArtNavBarView from '../../components/ui/SeaArtNavBarView'
import { goBack } from '../../navigation'

const SettingPage: React.FC = () => {
  const handleGoBack = () => {
    goBack()
  }

  return (
    <SafeAreaView style={tw('flex-1 bg-gray-50')}>
      <SeaArtNavBarView
        title={'设置'}
        leftView={<Text onPress={handleGoBack}>返回</Text>}
        backgroundColor={'#f5f5f5'}
        titleStyle={tw('text-black')}
      />

      <View style={tw('flex-1 p-16')}>
        <View style={tw('bg-white rounded-12 p-16 mb-16')}>
          <Text style={tw('text-16 font-semibold text-gray-800 mb-12')}>
            基本设置
          </Text>
          <TouchableOpacity style={tw('py-12 border-b border-gray-100')}>
            <Text style={tw('text-14 text-gray-600')}>账户信息</Text>
          </TouchableOpacity>
          <TouchableOpacity style={tw('py-12 border-b border-gray-100')}>
            <Text style={tw('text-14 text-gray-600')}>隐私设置</Text>
          </TouchableOpacity>
          <TouchableOpacity style={tw('py-12')}>
            <Text style={tw('text-14 text-gray-600')}>通知设置</Text>
          </TouchableOpacity>
        </View>

        <View style={tw('bg-white rounded-12 p-16')}>
          <Text style={tw('text-16 font-semibold text-gray-800 mb-12')}>
            其 他
          </Text>
          <TouchableOpacity style={tw('py-12 border-b border-gray-100')}>
            <Text style={tw('text-14 text-gray-600')}>关于我们</Text>
          </TouchableOpacity>
          <TouchableOpacity style={tw('py-12')}>
            <Text style={tw('text-14 text-red-500')}>退出登录</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default SettingPage
