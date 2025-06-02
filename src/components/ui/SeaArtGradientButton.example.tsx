/**
 * SeaArtGradientButton 使用示例
 */
import React from 'react'
import { Text, View } from 'react-native'
import SeaArtGradientButton from './SeaArtGradientButton'
import SeaArtNavBarView from '@/components/ui/SeaArtNavBarView'
import { tw } from '@/utils/twcss/twrnc'
import { goBack } from '@/navigation'
import { IconButton } from '@/components/ui/SeaArtNavBarView.example'
import SeaArtBasePage from '@/components/ui/SeaArtBasePage'
import { Toast } from '@/utils/toast'
import { useColors } from '@/theme'

const SeaArtGradientButtonExample = () => {
  const colors = useColors()

  const handlePress = () => {
    // Alert.alert('按钮被点击了！')
    Toast.show('按钮被点击了！')
  }

  return (
    <SeaArtBasePage style={tw(`flex-1`)}>
      <SeaArtNavBarView
        title={'按钮 使用示例'}
        backgroundColor={colors.background}
        titleStyle={tw(`text-[${colors.text.primary}]`)}
        leftView={
          <IconButton icon={'←'} color={colors.text.primary} onPress={goBack} />
        }
      />
      {/* 基础用法 */}
      <SeaArtGradientButton
        style={tw('mt-10 mx-16')}
        title={'基础按钮'}
        trackData={{
          entityType: 'button',
          entityName: 'basic_button',
        }}
        onPress={handlePress}
      />

      {/* 自定义颜色 */}
      <SeaArtGradientButton
        style={tw('mt-10 mx-16')}
        title={'自定义颜色'}
        colors={['#667eea', '#764ba2']}
        trackData={{
          entityType: 'button',
          entityName: 'custom_color_button',
        }}
        onPress={handlePress}
      />

      {/* 加载状态 */}
      <SeaArtGradientButton
        style={tw('mt-10 mx-16')}
        title={'加载中...'}
        isLoading={true}
        trackData={{
          entityType: 'button',
          entityName: 'loading_button',
        }}
        onPress={handlePress}
      />

      {/* 禁用状态 */}
      <SeaArtGradientButton
        style={tw('mt-10 mx-16')}
        title={'禁用按钮'}
        disabled={true}
        trackData={{
          entityType: 'button',
          entityName: 'disabled_button',
        }}
        onPress={handlePress}
      />

      {/* 自定义样式 */}
      <SeaArtGradientButton
        title={'自定义样式'}
        style={{
          height: 50,
          marginHorizontal: 16,
          borderRadius: 0,
          overflow: 'hidden',
          marginTop: 10,
        }}
        containerStyle={{
          borderRadius: 5,
          overflow: 'hidden',
        }}
        fontStyle={{ fontSize: 18, fontWeight: 'bold' }}
        colors={['#11998e', '#38ef7d']}
        trackData={{
          entityType: 'button',
          entityName: 'custom_style_button',
        }}
        onPress={handlePress}
      />

      {/* 使用children */}
      <SeaArtGradientButton
        colors={['#fc466b', '#3f5efb']}
        style={tw('mt-10 mx-16')}
        trackData={{
          entityType: 'button',
          entityName: 'custom_children_button',
        }}
        onPress={handlePress}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: 'white', marginRight: 8 }}>🚀</Text>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>自定义内容</Text>
        </View>
      </SeaArtGradientButton>

      {/* 基础用法 */}
      <SeaArtGradientButton
        style={tw('mt-10 mx-16')}
        title={'Toast-Success'}
        trackData={{
          entityType: 'button',
          entityName: 'toast_success_button',
        }}
        colors={['#1c4', '#38ef7d']}
        onPress={() => {
          Toast.success('成功啦成功啦成功啦成功啦成功啦成功啦成功啦')
        }}
      />
      <SeaArtGradientButton
        style={tw('mt-10 mx-16')}
        title={'Toast-Failure'}
        colors={['#fc4111', '#fc116b']}
        trackData={{
          entityType: 'button',
          entityName: 'toast_failure_button',
        }}
        onPress={() => {
          Toast.error('失败啦失败啦失败啦失败啦失败啦失败啦失败啦')
        }}
      />
      <SeaArtGradientButton
        style={tw('mt-10 mx-16')}
        title={'Toast-Loading'}
        trackData={{
          entityType: 'button',
          entityName: 'toast_loading_button',
        }}
        onPress={() => {
          Toast.loading()
          setTimeout(() => {
            Toast.hideAll()
          }, 3000)
        }}
      />
    </SeaArtBasePage>
  )
}

export default SeaArtGradientButtonExample
