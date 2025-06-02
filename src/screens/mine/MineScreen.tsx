/**
 * @filename MineScreen.tsx
 * @description 我的页面组件
 */

import SeaArtNavBarView from '@/components/ui/SeaArtNavBarView'
import SeaArtGradientButton from '@/components/ui/SeaArtGradientButton'
import SeaArtSlideMenu, {
  SlideMenuRef,
} from '@/components/ui/SeaArtSlideDrawer'
import { navigateToTab, push } from '@/navigation'
import { tw } from '@/utils/twcss/twrnc'
import React, { useRef } from 'react'
import { Text, View } from 'react-native'
import SeaArtBasePage from '@/components/ui/SeaArtBasePage'
import { useColors } from '@/theme'

const MineScreen: React.FC = () => {
  const slideLeftDrawerRef = useRef<SlideMenuRef>(null)

  const handleDrawerOpen = () => {
    slideLeftDrawerRef.current?.openDrawer()
  }

  const goToCreateScreen = () => {
    console.log('goToCreateScreen')
    navigateToTab('CreateScreen')
  }

  const colors = useColors()

  return (
    <SeaArtBasePage>
      <SeaArtNavBarView
        title={'我的'}
        leftView={
          <Text
            style={tw(`text-[${colors.text.primary}]`)}
            onPress={handleDrawerOpen}>
            打开抽屉
          </Text>
        }
        rightView={
          <Text
            style={tw(`text-[${colors.text.primary}]`)}
            onPress={goToCreateScreen}>
            去创作页面
          </Text>
        }
        backgroundColor={colors.background}
        titleStyle={tw(`text-[${colors.text.primary}]`)}
      />

      <SeaArtGradientButton
        title={'跳转设置页面'}
        style={tw('px-16 my-5')}
        trackData={{
          entityType: 'mine',
          entityName: 'mine',
        }}
        onPress={() => {
          push('SettingPage')
        }}
      />
      <SeaArtSlideMenu
        ref={slideLeftDrawerRef}
        drawerWidth={300}
        contentStyle={tw('flex-1 bg-white')}>
        <View style={tw('flex-1 items-center justify-center')}>
          <Text>抽屉内容</Text>
        </View>
      </SeaArtSlideMenu>

      <SeaArtGradientButton
        title={'按钮使用示例'}
        style={tw('px-16 my-5')}
        trackData={{
          entityType: 'mine',
          entityName: 'mine',
        }}
        onPress={() => {
          push('ButtonExamplesDemo')
        }}
      />
      <SeaArtGradientButton
        title={'导航栏使用示例'}
        style={tw('px-16 my-5')}
        trackData={{
          entityType: 'mine',
          entityName: 'mine',
        }}
        onPress={() => {
          push('NavigatorExamplesDemo')
        }}
      />
      <SeaArtGradientButton
        title={'Toast使用示例'}
        style={tw('px-16 my-5')}
        trackData={{
          entityType: 'mine',
          entityName: 'mine',
        }}
        onPress={() => {
          push('ToastExamplesDemo')
        }}
      />
      <SeaArtGradientButton
        title={'导航使用示例'}
        style={tw('px-16 my-5')}
        trackData={{
          entityType: 'mine',
          entityName: 'mine',
        }}
        onPress={() => {
          push('NavigatorExamplesDemo')
        }}
      />
      <SeaArtGradientButton
        title={'Zustand使用示例'}
        style={tw('px-16 my-5')}
        trackData={{
          entityType: 'mine',
          entityName: 'mine',
        }}
        onPress={() => {
          push('TodoListDemo')
        }}
      />
      <SeaArtGradientButton
        title={'PagerView使用示例'}
        style={tw('px-16 my-5')}
        trackData={{
          entityType: 'mine',
          entityName: 'mine',
        }}
        onPress={() => {
          push('PagerViewDemo')
        }}
      />
    </SeaArtBasePage>
  )
}

export default MineScreen
